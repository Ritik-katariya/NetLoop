import React from 'react'
import PostView from './ProfilePostFull'

export default function ProfilePost() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-white w-[58%] rounded-lg shadow-lg">
    {[1, 2, 3, 4, 5].map((item) => (
      <div
        key={item}
        className="aspect-square rounded-md overflow-hidden"
      >
       <PostView/>
      </div>
    ))}
  </div>
  )
}
