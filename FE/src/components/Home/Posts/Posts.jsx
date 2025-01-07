import React from 'react'
import PostComponent from './PostComponent'
import { useGetPostsQuery } from '../../../redux/api/post'
export default function Posts() {
  const { data, isLoading, isSuccess, error } = useGetPostsQuery();
    
  return (
    <div className='w-full h-full px-7 flex flex-col justify-center items-start py-5 z-[1]'>
      {
        data?.map(item=>(
          <PostComponent post={item} key={item.index} />
        ))
      }
    </div>
  )
}
