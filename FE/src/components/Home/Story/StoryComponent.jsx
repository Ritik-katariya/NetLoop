import React from 'react'

export default function StoryComponent(itm) {
  return (
    <div className='bg-primary w-16 rounded-full h-16 flex justify-center items-center'>
      <div >
        <img src={itm.img} alt={itm.name} />
        hello
      </div>
    </div>
  )
}
