import React from 'react'
import PostView from './ProfilePostFull'
import { useGetPostsQuery } from '../../redux/api/post'

export default function ProfilePost() {
  const { data, isLoading, isSuccess, error } = useGetPostsQuery();
  console.log("data", data)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.message || "An unexpected error occurred."}</div>;
  if (!isSuccess || !Array.isArray(data)) return <div>No posts available.</div>;
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-white w-[58%] rounded-lg shadow-lg">
    {data.length > 0 ? (
        data.map((post) => <PostView key={post.id} post={post} />)
      ) : (
        <div>No posts found.</div>
      )}
  </div>
  )
}
