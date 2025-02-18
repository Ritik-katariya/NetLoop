import React from 'react'
import PostComponent from './PostComponent'

import { useGetHomePostQuery } from '../../../redux/api/postApi'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import PostSkeleton from './PostSkeleton'
import NoData from './NoDataPost'
const Posts = () => {
  const [id, setid] = useState("1233");
  const {memberData}=useSelector(state=>state.member);
  useEffect(()=>{
    if(memberData){
      setid( memberData?.networks[0]?.id);
    }
  },[memberData])
 
  const { data: homePosts, isLoading: homeLoading, error: homeError } = useGetHomePostQuery(id);

  if (homeLoading) return <div>{
    [1,2,3].map((index)=><PostSkeleton key={index}/>)
  }</div>;
  if (homeError) return <div>{
    [1,2,3].map((index)=><PostSkeleton key={index}/>)
  }</div>;
  if (!homePosts?.length) return <NoData/>;
  

  return (
    <div className='w-full h-full lg:px-7 flex flex-col justify-center items-start py-5 z-[1]'>
      {homePosts?.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Posts;
