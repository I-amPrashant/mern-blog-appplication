import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function CreatePost() {
  const inputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploadError, setImageUploadError] = useState("");
  const [formData, setFormData] = useState({});
  const handleEditorChange = (content) => {
    setFormData({ ...formData, content: content });
  };

  useEffect(() => {
    const handleUpload = () => {
      setImageUploadError("");
      setImageFile(inputRef.current.files[0]);
    };

    inputRef.current.addEventListener("change", handleUpload);

    return () => inputRef.current.removeEventListener("change", handleUpload);
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
    imageData.append("upload_preset", "mern-blog");
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


  return (
    <div className="min-h-screen relative flex flex-col items-center mt-[100px] pb-6 gap-8 mx-auto max-w-[700px] px-5">
      <h1 className="font-semibold text-4xl">Create a Post</h1>
      <form action="#" className="flex flex-col gap-4 w-full text-gray-700">
        <div className="flex gap-4 flex-wrap ">
          <input
            type="text"
            placeholder="Title..."
            className="flex-grow border bg-gray-100 px-4 rounded-lg py-2 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <select
            name="category"
            id="blog-category"
            className="w-full sm:w-min outline-none border-[2px] px-3 rounded-lg
                "
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
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
          apiKey="xaijnny6zs1solrrw330k6n6u61z1rrin242pz52yz82g15q"
          init={{
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          }}
          initialValue="Welcome to TinyMCE!"
          onEditorChange={handleEditorChange}
          required
        />
        <button className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-lg ">
          Create
        </button>
      </form>
    </div>
  );
}
