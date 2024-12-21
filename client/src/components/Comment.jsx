import moment from "moment"
import { useEffect, useState } from "react"
export default function Comment({comment}) {
    const [user, setUser] = useState([]);
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
        </div>
    </div>
  )
}
