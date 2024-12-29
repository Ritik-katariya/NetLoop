import React from 'react'
import PostComponent from '../../Home/Posts/PostComponent'

export default function ProfilePosts() {
    const arr=[1,2,3,4]
  return (
    <div>
      {arr.map(()=>(<PostComponent/>))}
    </div>
  )
}
