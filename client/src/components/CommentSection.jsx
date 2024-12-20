import { useState } from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
export default function CommentSection({postId}) {
    const  {currentUser}=useSelector(state=>state.user);
    const [comment , setComment] = useState('');
    const [error, setError]= useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(comment.length> 200 || comment.length < 1){
            return setError('comment must be between 1 and 200 characters');
        }
        try {
            const res=await fetch(`/api/comment/create/`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({content:comment, postId, userId:currentUser.validUser._id})
        });
    
        const data=await res.json();
        if(res.ok){
            setComment('');
            setError('');
        }
        } catch (error) {
            setError(error.message);
        }
}

  return (
    <div className='max-w-[800px] mx-auto w-full p-1'>
        {currentUser?(
            <div className='flex text-start text-xs'>
                <p>Signed in as: </p>
                <img src={currentUser.validUser.profilePic} alt={currentUser.validUser.username} className='h-5 w-5 rounded-full '/>
                <Link to={`/dashboard?tab=profile`} className='text-cyan-400 hover:underline'>
                @{currentUser.validUser.username}
                </Link>
            </div>
        ):(
            <div className='flex text-start text-lg'>
                you must be signed to comment. &nbsp;
                <Link to="/sign-in" className='text-cyan-400 hover:underline text-lg'>sign in</Link>
            </div>
        )}
        {currentUser && (
            <div className='mt-5 max-w-[800px] mx-auto w-full px-4 py-2 relative border-[1px] border-cyan-600 border-opacity-60 rounded-sm'>
                <form className='flex flex-col items-end'>
                    <textarea type="text" className='resize max-h-[200px] min-h-[100px] min-w-full max-w-full outline-blue-400 bg-gray-100 rounded-md px-3 py-2' placeholder='Add a comment... ' onChange={(e)=>setComment(e.target.value)} value={comment}/>

                    <button onClick={(e)=>handleSubmit(e)} className='bg-gradient-to-r from-cyan-400 to-cyan-600 text-white px-4 py-2 rounded-md float-right mt-4'>Submit </button>
                </form>
                {
                    error && (
                        <p className='text-red-600 mt-2'>{error}</p>
                    )
                }
            </div>
        )}
    </div>
  )
}
