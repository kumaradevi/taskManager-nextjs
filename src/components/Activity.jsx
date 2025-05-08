import React, { useCallback, useEffect, useState } from 'react'
import { MdAutoGraph } from "react-icons/md";
import Card from './Card';
import RecentActivity from './RecentActivity';

const Activity = () => {
    const [tasks,setTasks]=useState([])
    const currentUser=localStorage.getItem('authUser');
    const token=localStorage.getItem('token')
  
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
  
    const complete=tasks?.filter((t)=>t.completed).length
   const completionRate=Math.round((complete/tasks.length)*100) || '0';
  return (
    <div>
         <div className="flex flex-col gap-6">
          <div className="w-[400px] shadow-sm rounded-md mr-6 p-5 mt-6 border border-gray-100">
            <div className="flex gap-2 items-center">
              <MdAutoGraph className="text-fuchsia-700" />
              <h1 className="font-bold">Task Statistics</h1>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <Card title='Total Tasks' count={tasks?.length}/>
              <Card title='Completed' count={tasks?.filter((t)=>t.completed).length}/>
              <Card title='Pending' count={tasks?.filter((t)=>!t.completed).length}/>
              <Card title='Completion Rate' count={completionRate}/>
            </div>
            <div className="mt-5">
              <div className="flex justify-between">
                <h1 className="font-semibold ">Task Progress</h1>
                <div className="w-8 h-6 rounded-full bg-purple-200 flex justify-center items-center">
                <p className="text-xs font-medium text-fuchsia-900" >{complete } / {tasks.length}</p>
                </div>
               
              </div>
              <div className="bg-fuchsia-100/80 rounded-full w-full h-2 mt-2 relative">
              <div className="bg-fuchsia-700 absolute top-0 left-0 rounded-full h-full" style={{width:`${completionRate}%`}}></div>
              </div>
            </div>
          </div>
           {/* recent activity */}
        <div>
          <RecentActivity currentUser={currentUser} token={token}/>
        </div>
        </div>
    </div>
  )
}

export default Activity