import React from "react";
import PostHeader from "../../Profile/Posts/UpperPartOfPost";
import { Image } from "@nextui-org/react";

const PostComponent = ({post}) => {
  
  return (
    <div className="w-[550px] bg-white  p-1 px-3 text-sm">
      <PostHeader post={post}/>
      <div>
        {post?.description}
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <Image
          src={post?.image}
          className="object-cover w-full p-1 h-[584px]"
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
