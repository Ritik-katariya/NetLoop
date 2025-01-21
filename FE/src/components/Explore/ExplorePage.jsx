import React from 'react'
import { useState } from 'react'
import ExploreAll from './ExploreAll/ExploreAll'
import News from './News/News'
import Event from './Event/Event'
import Openion from './Openion/Openion'
import Promotion from './Promotion/Promotion'
import {Divider} from "@heroui/divider";

export default function ExplorePage() {
    const [page, setpage] = useState("All")


  return (
   <div className='flex flex-col w-full justify-start items-center mt-4 gap-3'>
    <span className='absolute top-32 text-center text-[80px] font-bold text-transparent font-mono bg-clip-text bg-gradient-to-r from-[#323232cc] via-[#ebf9f6cf] to-[#00debca3] backdrop-brightness-50'>Explore NIT Agartala</span>
    <img src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="cover page of Netwrok" className='w-[70%] h-56 object-cover' />
     <div className='xl:w-[50%] min-h-screen flex flex-col gap-3 justify-start items-center px-4 '>
        
        <div className="flex justify-around w-full h-16 items-center text-[#616161] bg-white rounded-md shadow-lg text-xl font-mono font-semibold sticky top-0 z-10">
            <button onClick={()=>setpage("All")} className={`cursor-pointer px-3 py-1 rounded-md transition-colors ${
              page==="All" ? "bg-blue-100 text-teal-600" : "hover:bg-gray-100"
            }`}>All</button>
            <span className='h-8 border border-gray-300 '></span>
            <button onClick={()=>setpage("Newes")} className={`cursor-pointer px-3 py-1 rounded-md transition-colors ${
              page==="Newes" ? "bg-blue-100 text-teal-600" : "hover:bg-gray-100"
            }`}>News</button>
                        <span className='h-8 border border-gray-300 '></span>

            <button onClick={()=>setpage("Event")} className={`cursor-pointer px-3 py-1 rounded-md transition-colors ${
              page==="Event" ? "bg-blue-100 text-teal-600" : "hover:bg-gray-100"
            }`}>Event</button>
                        <span className='h-8 border border-gray-300 '></span>

            <button onClick={()=>setpage("Openion")} className={`cursor-pointer px-3 py-1 rounded-md transition-colors ${
              page==="Openion" ? "bg-blue-100 text-teal-600" : "hover:bg-gray-100"
            }`}>Opinion</button>
            <span className='h-8 border border-gray-300 '></span>

            <button onClick={()=>setpage("Promotion")} className={`cursor-pointer px-3 py-1 rounded-md transition-colors ${
              page==="Promotion" ? "bg-blue-100 text-teal-600" : "hover:bg-gray-100"
            }`}>Promotion</button>
        </div>
     <>
     {page==="All"&&<ExploreAll/>}
      {page==="Newes"&&<News/>}
      {page==="Event"&&<Event/>}
      {page==="Openion"&&<Openion/>}
      {page==="Promotion"&&<Promotion/>}
     </>

    </div>
   </div>
  )
}
