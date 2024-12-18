import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate, useParams } from "react-router-dom";
import {useSelector} from 'react-redux'

export default function UpdatePost() {
  const inputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploadError, setImageUploadError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });
  const {currentUser}=useSelector(state=>state.user);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    setErrorMessage("");
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
          setErrorMessage(data.message);
        } else {
          setFormData(data.posts[0]);
        }
      };
      fetchPost();
    } catch (err) {}
  }, [postId]);

  const handleEditorChange = (content) => {
    setFormData({ ...formData, content: content });
  };

  useEffect(() => {
    const handleUpload = () => {
      setImageUploadError("");
      setErrorMessage("");
      setImageFile(inputRef.current.files[0]);
    };

    if (inputRef.current) {
      inputRef.current.addEventListener("change", handleUpload);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("change", handleUpload);
      }
    };
  }, []);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setImageUploadError("");

    if (!imageFile) {
      setImageUploadError("Please upload an image");
      return;
    }

    if (imageFile.size > 2000000) {
      setImageUploadError("file size should be lesser than 2MB");
      return;
    }

    const imageData = new FormData();
    imageData.append("file", imageFile);
    imageData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
    imageData.append("folder", "mern-blog");

    const cloudName = "dy7cwxm7n";

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: imageData,
        }
      );
      const data = await res.json();
      setImageUrl(data.secure_url);
      setFormData({ ...formData, image: data.secure_url });
    } catch (err) {
      setImageUploadError("error uploading image", err.message);
    }
  };

  const handleSubmit = async (e) => {
    setErrorMessage("");
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser.validUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message);
        return;
      } else {
        navigate(`/post/${data.post.slug}`);
      }
    } catch (err) {
      setErrorMessage("something went wrong");
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center mt-[100px] pb-6 gap-8 mx-auto max-w-[700px] px-5">
      <h1 className="font-semibold text-4xl">Update a Post</h1>
      <form action="#" className="flex flex-col gap-4 w-full text-gray-700">
        <div className="flex gap-4 flex-wrap ">
          <input
            type="text"
            placeholder="Title..."
            className="flex-grow border bg-gray-100 px-4 rounded-lg py-2 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <select
            name="category"
            id="blog-category"
            className="w-full sm:w-min outline-none border-[2px] px-3 rounded-lg
                "
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="typescript">Typescript</option>
            <option value="react">React</option>
          </select>
        </div>

        {/* image uploader */}
        <div className="flex  items-center justify-between flex-wrap p-4 border border-dashed border-gray-400">
          <input type="file" accept="image/*" ref={inputRef} />
          <button
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-lg w-fit"
            onClick={(e) => handleImageUpload(e)}
          >
            Upload Image
          </button>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="uploaded-image"
              className="w-[350px] h-[350px] object-cover mt-10"
            />
          )}
          {imageUploadError && (
            <p className="text-red-500 text-2xl mt-4">{imageUploadError}</p>
          )}
        </div>

        {/* tinymce  */}
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          init={{
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          }}
          value={formData.content}
          onEditorChange={handleEditorChange}
          required
        />
        <button
          className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-lg "
          onClick={(e) => handleSubmit(e)}
        >
          Update
        </button>
        {errorMessage && (
          <p className="text-red-500 bg-red-200 p-2 rounded-xl text-center">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}
