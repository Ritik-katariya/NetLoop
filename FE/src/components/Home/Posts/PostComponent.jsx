import React from "react";
import PostHeader from "../../Profile/Posts/UpperPartOfPost";
import { Image } from "@nextui-org/react";

const PostComponent = ({post}) => {
  
  return (
    <div className="w-[550px] bg-white flex flex-col justify-center items-between  space-y-1 px-3 text-sm mb-3 rounded-md pb-6">
      <PostHeader post={post}/>
      <div className="text-[12px]">
        {post?.description}
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <Image
          src={post?.image}
          className="object-fill w-full p-1 max-h-[584px] min-h-[300px]"

        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-evenly gap-3 items-center">
            <span>#</span>
            <span>#</span>
            <span>#</span>
        </div>
        <div>
            #
        </div>
      </div>
      <div>
        <div>
            <input type="text" name="comment" id="comment" placeholder="Comment" className="w-11/12 border-b-2 border-gray-500 " />
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
