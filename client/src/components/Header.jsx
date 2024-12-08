import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

export default function Header() {
    const [navLinkClick, setNavLinkClick] = useState('Home')
    const [isNavCollapse, setIsNavCollapse] = useState(false)

    useEffect(()=>{
        window.addEventListener('resize', ()=>{
            setIsNavCollapse(false);
        })
    }, [])

  return (
    // header Component
    <div className={`overflow-hidden border-b-[2px] duration-200 ease-in-out h-[100px] ${isNavCollapse && 'h-[250px]'}`}>
        <div className={`relative flex py-8 px-2 sm:px-4 md:px-8 justify-between items-center max-w-[1400px] mx-auto`}>

       {/* logo  */}
       <div className='h-10 w-10'>
            <img src={Logo} alt="logo" className='h-full w-full scale-[3]'/>
        </div>

        {/* search  */}
        <div className='border border-gray-400 rounded-xl flex items-center px-3 py-2'>
            <input type="text" id='search' className='hidden sm:block outline-none border-none ' placeholder='Search...'/>
            <label htmlFor="search"><i className="fa-solid fa-magnifying-glass"></i></label>
        </div>

        {/* nav links  */}
        <div className='absolute top-[100px] left-4 lg:relative lg:top-0 lg:left-0'>
            <ul className='flex flex-col gap-5 lg:flex-row  lg:gap-10'>
                <li className={`cursor-pointer ${navLinkClick === 'Home' && 'text-blue-500'} hover:text-blue-500 duration-200 ease-in-out`} onClick={()=>setNavLinkClick('Home')}><Link to='/'>Home</Link></li>
                <li className={`cursor-pointer ${navLinkClick === 'About' && 'text-blue-500'} hover:text-blue-500 duration-200 ease-in-out`} onClick={()=>setNavLinkClick('About')}><Link to='/About'>About</Link></li>
                <li className={`cursor-pointer ${navLinkClick === 'Projects' && 'text-blue-500'} hover:text-blue-500 duration-200 ease-in-out`} onClick={()=>setNavLinkClick('Projects')}><Link to='/Projects'>Projects</Link></li>
            </ul>
        </div>

        {/*profile and buttons  */}
        <div className='flex gap-6'>
            <button className='hidden sm:block border-2
             border-gray-700 border-opacity-10 px-3 py-1 rounded-lg text-lg'><i className="fa-solid fa-sun"></i></button>
            <button className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg '>Sign In</button>

            {/* hamburger menu  */}

            <button className='lg:hidden  text-2xl' onClick={()=>setIsNavCollapse(!isNavCollapse)}>
                <i className="fa-solid fa-bars"></i>
            </button>
        </div>
        </div>
    </div>
  )
}
