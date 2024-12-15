import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {signInStart, signInSuccess, signInFailure, navigation} from '../redux/user/userSlice'
import {useDispatch, useSelector} from 'react-redux'
import OAuth from '../components/OAuth'

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const {loading, error:errorMessage} = useSelector(state=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleChange=(e)=>{
    setFormData({...formData, [e.target.name]:e.target.value.trim()})
  }


  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('All fields are required'));
    }
    
    try{
      dispatch(signInStart());
      const res=await fetch('/api/auth/signin', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      })

      const data=await res.json();

      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }

      if(data.success===false){
        return dispatch(signInFailure(data.message));
      }

    }catch(err){
     dispatch(signInFailure(err.message))
    }
  }
  return (
    <div className='min-h-screen max-w-[500px] m-auto mt-24 px-3'>
      <div className='m-auto'>
      <form action="#" className='flex flex-col gap-6'>

        {/* form header  */}
        <h1 className='text-4xl font-bold text-center'><span className='bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'>Prashant's</span> Blog</h1>

      {/* form items  */}
          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='font-bold text-xl'>Your email</label>
            <input type="email" name="email" id="email" className='border border-gray-400 border-opacity-50 rounded-xl px-3 py-2 outline-none ' placeholder='name@gmail.com'  onChange={(e)=>handleChange(e)}/>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="password" className='font-bold text-xl'>Your password</label>
            <input type="password" name="password" id="password" className='border border-gray-400 border-opacity-50 rounded-xl px-3 py-2 outline-none ' placeholder='password'  onChange={(e)=>handleChange(e)}/>
          </div>

          <div className='flex flex-col gap-2'>
           <button type='submit' className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl
           px-3 py-2' onClick={(e)=>handleSubmit(e)} disabled={loading}>{loading?'Loading...':'Sign In'} </button>
          </div>

          {/* google signin  */}
          <OAuth/>

            {/* error message  */}
            <div className='text-red-500 font-semibold text-center'>{errorMessage}</div>
      </form>
      <div className='mt-5 font-semibold'>Don't have an account? <Link to='/sign-up' className='text-blue-500 cursor-pointer' onClick={()=>dispatch(navigation())}>Sign Up</Link></div>
      </div>
    </div>
  )
}
