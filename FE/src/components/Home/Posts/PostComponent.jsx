import React from "react";
import PostHeader from "../../Profile/Posts/UpperPartOfPost";
import { Image } from "@nextui-org/react";

const PostComponent = ({post}) => {
  
  return (
    <div className="w-[550px] bg-white flex flex-col justify-center items-between  space-y-1  text-sm mb-3 rounded-md pb-6">
      <PostHeader post={post}/>
      <div className="text-[12px] text-gray-500 font-sans px-6">
        {post?.description}fdg
      </div>
      <div className="w-full h-full flex justify-center items-center ">
       {post?.image&& <Image
          src={post?.image}
          className="object-cover w-full p-1 max-h-[584px] min-h-[300px] "

        />}
        {
          post?.video&&<video width="550" height="300" controls>
            <source src={post?.video} type="video/mp4" />
          </video>
        }
      </div>
      <div className="flex justify-between items-center  px-4">
        <div className="flex justify-evenly gap-3 items-center">
            <span>#</span>
            <span>#</span>
            <span>#</span>
        </div>
        <div>
            #
        </div>
      </div>
      
        <div className="w-full px-4">
            <input type="text" name="comment" id="comment" placeholder="Comment" className="w-11/12 border-b-2 border-gray-500 " />
        </div>
      
    </div>
  );
};

export default PostComponent;
