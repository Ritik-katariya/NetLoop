import React from 'react'

export default function SideProfile() {
    const arr=[1,2]
  return (
    <div className="w-[18%] mt-24 p-6 flex flex-col pt-9 text-sm   bg-gray-50 rounded-md h-[650px] shadow-md border-[.5px]">
      <div className='flex justify-center items-center flex-col border-b-2 pb-2'>
        <img src="" alt="" className='w-16 h-16 bg-gray-200 rounded-full '/>
        <h1 className='text-center text-black text-base font-semibold pt-3'>Ritik Kumar</h1>
        <h3 className='text-center text-xs text-gray-400'>NIT Agartala</h3>
      </div>
      <div className='border-b-2 pb-2'> 
        <span className="flex justify-between items-center pt-2 ">
            <h3 className="text-lg font-semibold mb-2">Network</h3>
            <h3 className="text-lg font-semibold mb-2">2</h3>
        </span>
        {arr.map((value)=>(<h3>{value}</h3>))}
      </div>
      <div >
        <span className="flex justify-between items-center pt-4">
            <h3 className="text-lg font-semibold mb-2">Chanels</h3>
            <h3 className="text-lg font-semibold mb-2">2</h3>
        </span>
        {arr.map((value)=>(<h3>{value}</h3>))}
      </div>
      
    </div>
  )
}
