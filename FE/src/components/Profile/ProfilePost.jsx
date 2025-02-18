import React from "react";
import PostView from "./ProfilePostFull";
import { memberInfo } from "../../utils/auth";
import { useGetPostByMemberQuery } from "../../redux/api/post";
import { Spinner } from "@nextui-org/react";
import { useParams } from "react-router-dom";

export default function ProfilePost() {
  const memberId = useParams()?.id || "";


  const { data, isLoading, isSuccess, isError, error } = useGetPostByMemberQuery(memberId);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner color="primary" size="lg" />
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 font-medium p-4">
        ❌ Error: {error?.message || "An unexpected error occurred."}
      </div>
    );

  if (!isSuccess || !Array.isArray(data))
    return (
      <div className="text-center text-gray-500 p-4">
        No posts available. Start sharing your thoughts!
      </div>
    );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Posts</h2>
      {data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((post) => (
            <PostView key={post?.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 p-6">
          📭 No posts found. Start creating!
        </div>
      )}
    </div>
  );
}
