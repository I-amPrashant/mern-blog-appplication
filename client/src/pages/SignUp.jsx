import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='min-h-screen max-w-[500px] m-auto mt-24 px-3'>
      <div className='m-auto'>
      <form action="#" className='flex flex-col gap-6'>

        {/* form header  */}
        <h1 className='text-4xl font-bold text-center'><span className='bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'>Prashant's</span> Blog</h1>

      {/* form items  */}
          <div className='flex flex-col gap-2 mt-8'>
            <label htmlFor="username" className='font-bold text-xl'>Your Username</label>
            <input type="text" name="username" id="username" className='border border-gray-400 border-opacity-50 rounded-xl px-3 py-2 outline-none ' placeholder='Username' />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='font-bold text-xl'>Your email</label>
            <input type="text" name="email" id="email" className='border border-gray-400 border-opacity-50 rounded-xl px-3 py-2 outline-none ' placeholder='name@gmail.com' />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="password" className='font-bold text-xl'>Your password</label>
            <input type="text" name="password" id="password" className='border border-gray-400 border-opacity-50 rounded-xl px-3 py-2 outline-none ' placeholder='password' />
          </div>

          <div className='flex flex-col gap-2'>
           <button type='submit' className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl
           px-3 py-2'>Submit </button>
          </div>

      </form>
      <div className='mt-10 font-semibold'>Have an account? <Link to='/sign-in' className='text-blue-500 cursor-pointer'>Sign In</Link></div>
      </div>
    </div>
  )
}
