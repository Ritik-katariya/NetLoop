import React from 'react';
import PostComponent from '../../Home/Posts/PostComponent';
import { useGetPostByMemberQuery } from '../../../redux/api/post';
import { memberInfo } from '../../../utils/auth';
export default function ProfilePosts() {
  const memberId=memberInfo().id;
  const { data, isLoading, isSuccess, error } = useGetPostByMemberQuery(memberId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.message || "An unexpected error occurred."}</div>;
  if (!isSuccess || !Array.isArray(data)) return <div>No posts available.</div>;

  return (
    <div className='flex flex-col gap-4 justify-center'>
      {data.length > 0 ? (
        data.map((post) => <PostComponent key={post?.id} post={post} />)
      ) : (
        <div>No posts found.</div>
      )}
    </div>
  );
}
