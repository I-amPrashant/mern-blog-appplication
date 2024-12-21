import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
export default function Comment({comment, onLike}) {
    const [user, setUser] = useState([]);
    const {currentUser} = useSelector(state=>state.user);
    useEffect(()=>{
        const getUsers=async()=>{
            try {
                const res=await fetch(`/api/user/${comment.userId}`);
                const data=await res.json();
                if(res.ok){
                    setUser(data.users);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getUsers()
    }, [comment])
  return (
    <div className="flex p-4 gap-3 border-b">
        <div className="">
            <img src={user.profilePicture} alt={user.username} className="h-10 w-10 rounded-full"/>
        </div>
        <div className=" flex flex-col gap-4">
            <p className="font-semibold">@{user && user.username} <span className="ml-5 text-slate-400 font-normal text-sm">{moment(comment.createdAt).fromNow()}</span></p>
            <p className="text-gray-500 pb-3">{comment.content}</p>

            <div className="flex gap-4 flex-wrap">
                <button type="button" className={`outline-none border-none hover:text-blue-400 duration-200 ${currentUser && comment.liked.includes(currentUser.validUser._id)?'text-blue-400':''}`} onClick={() => onLike(comment._id)}><i className={`fa-${currentUser && comment.liked.includes(currentUser.validUser._id)?'solid':'regular'} fa-heart`}></i>  {comment.numberOfLikes > 0 && <span className="ml-2 text-slate-400">{comment.numberOfLikes} Likes</span>}</button>
            </div>
        </div>
    </div>
  )
}
