import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function Comment({ comment, onLike, onEdit , onDelete}) {
  const [user, setUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data.users);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUsers();
  }, [comment]);

  const handleEdit = async () => {
    setIsEditing(true);
    setEditedComment(comment.content);
  };

  const handleSave = async () => {
        try {
            const res=await fetch(`/api/comment/editComment/${comment._id}`, {
                method:"PUT",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify({
                    content:editedComment
                })
            })

            if(res.ok){
                setIsEditing(false);
                onEdit(comment, editedComment)
            }
        } catch (error) {
            console.log(error.message)
        }
  }

 
  return (
    <div className="flex p-4 gap-3 border-b">
      <div className="">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="h-10 w-10 rounded-full"
        />
      </div>
      <div className=" flex flex-col gap-4">
        <p className="font-semibold">
          @{user && user.username}{" "}
          <span className="ml-5 text-slate-400 font-normal text-sm">
            {moment(comment.createdAt).fromNow()}
          </span>
        </p>

        {isEditing ? (
            <> 
            <textarea className="w-full p-2 text-gray-500 bg-gray-200 rounded-md focus:outline-none focus:bg-gray-100 h-24"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            ></textarea>
            
            <div className="flex justify-end gap-5">
                <button type="button" className="outline-none border-none hover:text-blue-400 duration-200  px-3 py-2 bg-gradient-to-br from bg-cyan-500 to-blue-500 text-white rounded-md" onClick={handleSave}>save</button>
                <button onClick={()=>setIsEditing(false)} type="button" className="outline-none border-none hover:text-blue-400 duration-200  px-3 py-2 bg-gradient-to-br from bg-cyan-500 to-blue-500 text-white rounded-md">Cancel</button>
            </div>
            </>
        ) : (
          <>
            <p className="text-gray-500 pb-3">{comment.content}</p>

            <div className="flex gap-8 flex-wrap">
              <button
                type="button"
                className={`outline-none border-none hover:text-blue-400 duration-200 ${
                  currentUser &&
                  comment.liked.includes(currentUser.validUser._id)
                    ? "text-blue-400"
                    : ""
                }`}
                onClick={() => onLike(comment._id)}
              >
                <i
                  className={`fa-${
                    currentUser &&
                    comment.liked.includes(currentUser.validUser._id)
                      ? "solid"
                      : "regular"
                  } fa-heart`}
                ></i>{" "}
                {comment.numberOfLikes > 0 && (
                  <span className="ml-2 text-slate-400">
                    {comment.numberOfLikes} Likes
                  </span>
                )}
              </button>
              {currentUser.validUser &&
                currentUser.validUser._id === comment.userId && (
                  <>
                  
                  <button
                    onClick={handleEdit}
                    type="button"
                    className="outline-none border-none hover:text-blue-400 duration-200"
                  >
                    Edit{" "}
                  </button>
                  <button
                    onClick={() => onDelete(comment._id)}
                    type="button"
                    className="outline-none border-none hover:text-blue-400 duration-200"
                  >
                    Delete{" "}
                  </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
