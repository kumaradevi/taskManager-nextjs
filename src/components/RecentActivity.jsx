import React from 'react'
import { LuClock4 } from "react-icons/lu";

const RecentActivity = ({currentUser,token}) => {
  return (
    <div className='w-[400px] shadow-sm rounded-md p-5 border border-gray-100'>
        <div className='flex gap-2 items-center '>
        <LuClock4 className='text-fuchsia-600'/>
        <h1 className='font-bold'>Recent Activity</h1>
        </div>
        <div className='mt-5 flex flex-col justify-center items-center'>
            <div className='w-12 h-12 rounded-full bg-purple-100 flex justify-center items-center'>
            <LuClock4 className='text-purple-600'/>
            </div>
            <p className='mt-3 text-gray-800 font-medium'>No recent activity yet</p>
            <span className='text-gray-400 text-xs mt-2'>task will be appear here</span>
        </div>
    </div>
  )
}

export default RecentActivity