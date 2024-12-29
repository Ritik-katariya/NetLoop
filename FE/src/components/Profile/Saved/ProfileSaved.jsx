import React from 'react'
import Saved from './Saved'

export default function ProfileSaved() {
    const arr=[1,2,3,4,5,6,7,8,9]
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-white w-full rounded-lg shadow-lg">
      {arr.map(()=>(<Saved/>))}
    </div>
  )
}
