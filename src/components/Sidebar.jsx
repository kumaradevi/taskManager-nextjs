import React, { useCallback, useEffect, useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { FaListCheck } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";

const Sidebar = ({currentUser,token}) => {
  const [isActive,setIsActive]=useState(0);
  const [tasks,setTasks]=useState([])
  const initial=currentUser?.username?.charAt(0).toUpperCase() || '';
  
  const fetchTaskById=useCallback(async()=>{
    try{
      const res=await axios.get(`http://localhost:4000/api/${currentUser.role}/tasks/${currentUser._id}`,{headers:{Authorization:`Bearer ${token}`}});
      console.log(res)
      setTasks(res.data.data)
    }
    catch(err){
      console.log(err.message)
    }
   
  })
  
  const fetchAllTasks=useCallback(async()=>{
    try{
        const res=await axios.get(`http://localhost:4000/api/${currentUser.role}/getAllTasks`,{headers:{Authorization:`Bearer ${token}`}});
        console.log(res)
        setTasks(res.data.data)
    }
    catch(err){
      console.log(err.message)
    }
  })
  
  useEffect(()=>{
      if(currentUser?.role === 'user'){
        fetchTaskById();
      }
      else{
        fetchAllTasks();
      }
  },[currentUser]);
 

    const totalTasks=tasks?.length; 
    const completed=tasks?.filter((t)=>t.completed).length;
    const percentage=Math.round((completed/totalTasks)*100) || '0'

  
 
  return (
    <div className="w-56 border-r border-gray-200 h-full fixed shadow-sm ">
      <div className="p-5">
        <div className="flex gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-fuchsia-700 to-purple-600 text-white flex justify-center items-center text-2xl font-semibold">
            {initial}
          </div>

          <div className="flex flex-col">
            <h1 className="font-semibold">Hey, {currentUser?.userName}</h1>
            <p className="text-xs text-fuchsia-700 font-medium">let's crush some task</p>
          </div>
        </div>

        <div className="mt-5 shadow-sm rounded-md p-3">
          <div className="flex justify-between">
            <h1 className="font-semibold  text-purple-500">Productivity</h1>
            <div className="w-8 h-6 rounded-full bg-purple-200 flex justify-center items-center">
              <p className="text-xs font-medium text-fuchsia-900">{percentage}%</p>
            </div>
          </div>
          <div className="bg-fuchsia-100/80 rounded-full w-[100%] h-2 mt-2 relative">
           <div className="bg-fuchsia-600 h-full absolute top-0 left-0 rounded-full" style={{ width: `${percentage}%` }} ></div>
          </div>
        </div>

        <ul className="mt-8 flex flex-col gap-2">
          <div className={`flex gap-2 items-center ${isActive ===0 ? 'bg-fuchsia-100 shadow-sm rounded-lg p-2 text-purple-500 font-medium border-l-4 border-purple-600':'bg-transparent  p-2'}`}>
            <GrHomeRounded className="text-purple-700 font-medium" />
           <Link href={'/'}><li onClick={()=>setIsActive(0)}>Dashboard</li></Link> 
          </div>
          <div className={`flex gap-2 items-center ${isActive ===1 ? 'bg-fuchsia-100 shadow-sm rounded-lg p-2 text-purple-500 font-medium border-l-4 border-purple-600':'bg-transparent  p-2'}`}>
            <FaListCheck className="text-purple-700" />
            <Link href={'/pending'}><li onClick={()=>setIsActive(1)}>Pending tasks</li></Link>
          </div>
          <div className={`flex gap-2 items-center ${isActive ===2 ? 'bg-fuchsia-100 shadow-sm rounded-lg p-2 text-purple-500 font-medium border-l-4 border-purple-600':'bg-transparent  p-2'}`}>
            <FaCheck className="text-purple-700" />
            <Link href={'/completed'}><li onClick={()=>setIsActive(2)}>Completed tasks</li></Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
