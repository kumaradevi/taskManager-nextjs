import React from 'react'
import { FiGrid } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";




const Navbar = ({authUser,handleLogout}) => {
   const initial=authUser?.username?.charAt(0).toUpperCase() || '';
   
  return (
    <div className='sticky top-0 z-30 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200'>
        <div className='flex justify-between items-center px-4 py-2 md:px-6 max-w-8xl mx-auto h-20'>
        {/* logo */}
        <div className='flex gap-2 items-center'>
       <div className='w-8 h-8 bg-gradient-to-br from-fuchsia-600 via-purple-500 to-fuchsia-300 flex justify-center items-center rounded-md cursor-pointer' >
        <div className='w-5 h-5 text-white hover:scale-105 transition-all duration-300'> <FiGrid size={25} /></div>
       
        </div>
       <h1 className='text-2xl font-bold bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide'>Task manager</h1>
        </div>
        {/*  */}
       <div className='flex gap-3'>
        <div className='flex items-center text-fuchsia-700'><IoIosNotificationsOutline size={35}/></div>
        <div className='w-10 h-10 rounded-full bg-gradient-to-r from-fuchsia-700 to-purple-600 text-white flex justify-center items-center text-2xl font-semibold'>{initial}</div>
        <div className='flex flex-col'>
          <h1>{authUser?.username || 'kumaradevi'}</h1>
          <h1 className='text-gray-400 text-xs'>{authUser?.email || 'Kums@gmail.com'}</h1>
        </div>
        <div className='flex items-center ml-6 cursor-pointer' onClick={handleLogout}><IoIosLogOut  size={30} className='text-purple-600'/></div>
       </div>
        </div>
    </div>
  )
}

export default Navbar
