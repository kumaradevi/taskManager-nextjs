import React from 'react'




const Card = ({title,count,icon}) => {
  return (
    <div>
        <div className='flex gap-2 shadow-sm rounded-md px-3 py-2 items-center'>
            <div className='bg-fuchsia-100 w-8 h-8 rounded-md flex justify-center items-center'>
                <div>{icon}</div>
            </div>
            <div>
                <h1 className='font-semibold text-fuchsia-600 text-lg'>{count}</h1>
                <p className='text-xs text-gray-700'>{title}</p>
            </div>
        </div>
    </div>
  )
}

export default Card