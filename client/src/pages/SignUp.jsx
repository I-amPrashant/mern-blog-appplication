import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate();

  const handleChange=(e)=>{
    setErrorMessage('');
    setFormData({...formData, [e.target.name]:e.target.value.trim()})
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    setErrorMessage('');

    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('All fields are required');
    }

    try{
      setLoading(true);
      const res=await fetch('/api/auth/signup', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      })

      const data=await res.json();

      setLoading(false);

      if(res.ok){
        navigate('/sign-in');
      }

      if(data.success===false){
        return setErrorMessage(data.message);
      }

    }catch(err){
      setErrorMessage(err.message);
      setLoading(false);
    }
  }
  return (
    <div className='min-h-screen max-w-[500px] m-auto mt-24 px-3'>
      <div className='m-auto'>
      <form action="#" className='flex flex-col gap-6'>

        {/* form header  */}
        <h1 className='text-4xl font-bold text-center'><span className='bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'>Prashant's</span> Blog</h1>

      {/* form items  */}
          <div className='flex flex-col gap-2 mt-8'>
            <label htmlFor="username" className='font-bold text-xl'>Your Username</label>
            <input type="text" name="username" id="username" className='border border-gray-400 border-opacity-50 rounded-xl px-3 py-2 outline-none ' placeholder='Username' onChange={(e)=>handleChange(e)}/>
          </div>

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
           px-3 py-2' onClick={(e)=>handleSubmit(e)} disabled={loading}>{loading?'Loading...':'Sign Up'} </button>
          </div>

          <OAuth/>

            {/* error message  */}
            <div className='text-red-500 font-semibold text-center'>{errorMessage}</div>
      </form>
      <div className='mt-5 font-semibold'>Already Have an account? <Link to='/sign-in' className='text-blue-500 cursor-pointer'>Sign In</Link></div>
      </div>
    </div>
  )
}
