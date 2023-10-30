import React from 'react'

const Event = (props) => {
  return (
    <div className='w-64 p-4 overflow-hidden bg-white rounded-lg shadow-md'>
        <img src={props.imgUrl} alt="Event Image" className="object-cover w-full h-32 mb-4 rounded-lg"/>
        <div className="mb-2 border-b border-gray-200">
            <p className='inline-block px-2 py-1 text-sm text-gray-600 border border-gray-300 rounded'>{props.dateAndTime}</p>
            <h2 className='mt-2 mb-4 text-xl font-medium'>{props.title}</h2>
        </div>
        <h3 className='text-lg font-semibold'>{props.location}</h3>
        <p className='text-gray-500'>{props.description}</p>
    </div>
  )
}


export default Event