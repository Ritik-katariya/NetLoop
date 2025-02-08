import React from 'react'
import Saved from './Saved'
import { useGetSavedItemsQuery } from '../../../redux/api/postSaved'
import { memberInfo } from '../../../utils/auth'
import PostView from '../ProfilePostFull'

export default function ProfileSaved() {
  const {id}=memberInfo()
  const {data}=useGetSavedItemsQuery({memberId:id});
  console.log(data?.savedItems,"profile")
    const save=data?.savedItems||[];
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-white w-full rounded-lg shadow-lg">
      {save.length>0&&save.map((item)=>(<PostView id={item?.post?.id} post={item?.post} key={item?.id}/>))}
    </div>
  )
}
