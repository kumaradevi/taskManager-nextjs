"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { FaRegEnvelope } from "react-icons/fa6";
import { IoLockClosedOutline } from "react-icons/io5";
import { FiUserPlus } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";

const page = () => {
   
    const [formData,setFormData]=useState({
      email:"",
      password:"",
    });
 const dispatch=useDispatch();
  const router=useRouter();
  
//   useEffect(()=>{
//     if(currentUser && currentUser?.role) return router.push('/')

//   },[currentUser])
  
    const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData(prev=>({...prev,[name]:value}))
    }
   console.log(formData)
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
      
     dispatch({type:'AUTH_LOGIN_REQUEST',payload:formData})
      toast.success('logged in successfully');
      setTimeout(() => {
        router.push('/')
      }, 1000);
      }
      catch(err){
        toast.error(err.message)
      }
      console.log(formData,"from submit")
    }

  return (
    <div className="bg-gray-200 fixed top-0 left-0 w-full h-full z-80 flex justify-center items-center">
      <div className="w-xl bg-white rounded-md shadow-sm p-7 flex flex-col gap-3">
        <div className="flex justify-center items-center">
        <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-700 to-purple-700 text-white">
        <IoIosLogOut size={30}/>
        </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-center">Welcome</h1>
          <p className="text-gray-500 text-center">Join task manager to manage your tasks</p>
        </div>
        <div>
          <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
           
            <div className="flex gap-2 items-center border-2 border-gray-300 px-3 py-2 rounded-md focus-within:border-fuchsia-700  w-[90%] mx-auto">
              <FaRegEnvelope className="text-fuchsia-700"/>
              <input
                type="email"
                placeholder="Email"
                className="outline-none"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2 items-center border-2 border-gray-300 px-3 py-2 rounded-md focus-within:border-fuchsia-700  w-[90%] mx-auto">
              <IoLockClosedOutline  className="text-fuchsia-700 "/>
              <input
                type="password"
                placeholder="Password"
                className="outline-none"
                name="password"
                value={formData.password}
                onChange={handleChange}
               
              />
            </div>
            <div className="flex justify-center items-center mt-2">
            <button type="submit" className="w-50 cursor-pointer bg-gradient-to-r from-fuchsia-700 to-purple-600  text-white px-3 py-2 rounded-md flex gap-2 items-center justify-center">
            <FiUserPlus />
               Login
            </button>
            </div>
            <p className="text-center mt-3">Don't have an account? <span className="text-fuchsia-800 font-semibold cursor-pointer" onClick={()=>router.push('/signup')}>Signup</span></p>
          </form>
        </div>
      </div>
      <Toaster/>
    </div>
  )
}

export default page