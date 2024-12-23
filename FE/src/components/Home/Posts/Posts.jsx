import React from 'react'
import PostComponent from './PostComponent'

export default function Posts() {
    const arr=[1,2,3,4,5,6,7,8,9,10]
  return (
    <div className='w-full px-6 flex flex-col justify-center items-start py-4'>
      {
        arr.map(item=>(
          <PostComponent item={item} id={item.index}/>
        ))
      }
    </div>
  )
}
