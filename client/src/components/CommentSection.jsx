import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Comment from "./Comment";
export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200 || comment.length < 1) {
      return setError("comment must be between 1 and 200 characters");
    }
    try {
      const res = await fetch(`/api/comment/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser.validUser._id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setComment("");
        setError("");
        setComments([...comments, data.comment]);
      }else{
        setError(data.message)
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getComments();
  }, [postId]);

  return (
    <div className="max-w-[800px] mx-auto w-full p-1">
      {currentUser ? (
        <div className="flex text-start text-xs">
          <p>Signed in as: </p>
          <img
            src={currentUser.validUser.profilePicture}
            alt={currentUser.validUser.username}
            className="h-5 w-5 rounded-full ml-3"
          />
          <Link
            to={`/dashboard?tab=profile`}
            className="text-cyan-400 hover:underline"
          >
            @{currentUser.validUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex text-start text-lg">
          you must be signed to comment. &nbsp;
          <Link to="/sign-in" className="text-cyan-400 hover:underline text-lg">
            sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <div className="mt-5 max-w-[800px] mx-auto w-full px-4 py-2 relative border-[1px] border-cyan-600 border-opacity-60 rounded-sm">
          <form className="flex flex-col items-end">
            <textarea
              type="text"
              className="resize max-h-[200px] min-h-[100px] min-w-full max-w-full outline-blue-400 bg-gray-100 rounded-md px-3 py-2"
              placeholder="Add a comment... "
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />

            <button
              onClick={(e) => handleSubmit(e)}
              className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-white px-4 py-2 rounded-md float-right mt-4"
            >
              Submit{" "}
            </button>
          </form>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      )}

      {comments.length < 0 ? (
        <p className="my-8">no comments yet</p>
      ) : (
        <div className="my-8">
          <h1 className="font-semibold">
            Comments <span className="px-3 py-1 border">{comments.length}</span>
          </h1>

          <div className="my-10 flex flex-col gap-6">
            {comments.map((comment, index) => {
              return <Comment key={comment._id} comment={comment}/>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
