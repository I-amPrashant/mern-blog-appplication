import React from 'react'
import {app} from '../firebase'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import {useDispatch} from 'react-redux'
import {signInSuccess} from '../redux/user/userSlice'
import {useNavigate} from 'react-router-dom'

export default function OAuth() {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const auth=getAuth(app);
    const handleClick=async (e)=>{
        e.stopPropagation();
        const provider=new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'});

        try{
            const resultsFromGoogle=await signInWithPopup(auth, provider);
            const res=await fetch('/api/auth/google', {
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    name:resultsFromGoogle.user.displayName,
                    email:resultsFromGoogle.user.email,
                    googlePhotoUrl:resultsFromGoogle.user.photoURL
                })
            });

            const data=await res.json();
            if(res.ok){
                dispatch(signInSuccess(data));
                return navigate('/');
            }

        }catch(err){
            console.log(err.message)
        }
    }
  return (
        <button className='bg-gradient-to-r from-blue-500 to-cyan-500 text-white w-full py-3 rounded-xl text-center' onClick={(e)=>handleClick(e)}>&nbsp;<i className='fa-brands fa-google'></i> Continue with Google</button>
  )
}
