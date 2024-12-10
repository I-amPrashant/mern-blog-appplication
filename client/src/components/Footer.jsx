import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='px-5 sm:px-8 pt-8 border-t-[1px] border-gray-500 '>

      <div>
      <h1 className='text-2xl font-bold'><span className='bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'>Prashant's</span> Blog</h1>
          <div className='mt-7 flex flex-wrap gap-16 justify-between mb-10'>
            <div className='flex flex-col gap-4'>
              <h4 className='font-semibold text-gray-500 uppercase '>About</h4>
              <h5 className='text-gray-500 cursor-pointer'>React Bootcamp</h5>
              <h5 className='text-gray-500 cursor-pointer'>Prashant's blog</h5>
            </div>
            <div className='flex flex-col gap-4'>
              <h4 className='font-semibold text-gray-500 uppercase '>Follow us</h4>
              <h5 className='text-gray-500 cursor-pointer'>React Bootcamp</h5>
              <h5 className='text-gray-500 cursor-pointer'>Prashant's blog</h5>
            </div>
            <div className='flex flex-col gap-4'>
              <h4 className='font-semibold text-gray-500 uppercase '>Legal</h4>
              <h5 className='text-gray-500 cursor-pointer'>React Bootcamp</h5>
              <h5 className='text-gray-500 cursor-pointer'>Prashant's blog</h5>
            </div>
          </div>
      </div>


      <div className='flex flex-wrap justify-between gap-5 border-t-[1px] border-gray-200 py-3'>
        <h4 className='font-medium text-gray-500'>&copy; 2024 All rights reserved</h4>
        <ul className='flex gap-7'>
          <li className='cursor-pointer text-2xl text-gray-500'><Link to='#'><i className="fa-brands fa-facebook"></i></Link></li>
          <li className='cursor-pointer text-2xl text-gray-500'><Link to='#'><i className="fa-brands fa-twitter"></i></Link></li>
          <li className='cursor-pointer text-2xl text-gray-500'><Link to='#'><i className="fa-brands fa-instagram"></i></Link></li>
          <li className='cursor-pointer text-2xl text-gray-500'><Link to='#'><i className="fa-brands fa-linkedin"></i></Link></li>
          <li className='cursor-pointer text-2xl text-gray-500'><Link to='#'><i className="fa-brands fa-github"></i></Link></li>
        </ul>
      </div>
    </div>
  )
}
