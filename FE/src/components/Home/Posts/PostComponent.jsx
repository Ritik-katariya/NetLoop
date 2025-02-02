import React from "react";
import PostHeader from "../../Profile/Posts/UpperPartOfPost";
import { Image } from "@nextui-org/react";

const PostComponent = ({ post }) => {
  return (
    <div className="w-full max-w-[550px] md:max-w-[600px] lg:max-w-[650px]  bg-white flex flex-col space-y-2 text-sm mb-3 rounded-md pb-6 shadow-md">
      <PostHeader post={post} />

      {/* Post Description */}
      <div className="text-[12px] text-gray-500 font-sans px-4 sm:px-6 break-words">
        {post?.description}
      </div>

      {/* Post Media (Image or Video) */}
      <div className="w-full flex justify-center items-center">
        {post?.image && (
          <Image
            src={post?.image}
            className="object-cover w-full max-h-[500px] min-h-[250px] p-1 rounded-lg"
          />
        )}
        {post?.video && (
          <video
            className="w-full max-w-[500px] sm:max-w-[550px] lg:max-w-[600px] rounded-lg object-contain h-[80vh] sm:max-h-[600px] lg:max-h-[700px]"
            controls
          >
            <source src={post?.video} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Hashtags Section */}
      <div className="flex justify-between items-center px-4 text-gray-600 text-xs sm:text-sm">
        <div className="flex gap-2 sm:gap-3">
          <span>#hashtag1</span>
          <span>#hashtag2</span>
          <span>#hashtag3</span>
        </div>
        <div>#more</div>
      </div>

      {/* Comment Input */}
      <div className="w-full px-4">
        <input
          type="text"
          name="comment"
          id="comment"
          placeholder="Write a comment..."
          className="w-full border-b-2 border-gray-400 py-1 focus:outline-none focus:border-blue-500 transition"
        />
      </div>
    </div>
  );
};

export default PostComponent;
