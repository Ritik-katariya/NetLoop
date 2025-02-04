import React from 'react'
import PostComponent from './PostComponent'
import { useGetPostsQuery } from '../../../redux/api/postApi'

const Posts = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery();

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts</div>;
  if (!posts?.length) return <div>No posts available</div>;

  return (
    <div className='w-full h-full lg:px-7 flex flex-col justify-center items-start py-5 z-[1]'>
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Posts;
