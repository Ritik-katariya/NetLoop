import React from "react";
import PostHeader from "../../Profile/Posts/UpperPartOfPost";
import { Image } from "@nextui-org/react";
import { GiCheckMark } from "react-icons/gi";
import { Avatar } from "@nextui-org/react";
import { getTimeAgo } from "../../../utils/timeAgoCreate";
import OptionButton from "../../Profile/Posts/ThreeDot";

const NewsCompo = ({data}) => {
const {id,author,content,createdAt,image,member,title}=data;

  
  return (
    <div className="w-[550px] bg-white flex flex-col justify-center items-between  space-y-1 px-3 text-sm mb-3 rounded-md pb-6 ">
         <div className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center gap-3">
        <Avatar
          src={member?.profile?.img}
          size="md"
          className="border-2 border-primary"
        />
          <div className="flex flex-col">
            <div className="flex justify-start items-center gap-4">
            <h3 className="text-base font-semibold">{member?.name}</h3>
            {member?.verified && <GiCheckMark className="text-primary" />}
            <span className="text-xs text-gray-400 ml-2">
              {getTimeAgo(new Date(createdAt))}
            </span>
            </div>
           {member?.networks.length > 0 && (<p className="text-[10px] text-gray-500">{member?.networks[0]?.name}</p>)}
          </div>
      </div>
      <OptionButton id={id} />
    </div>
    {/* news body */}
      <div className="text-[12px]">
        <h1 className="text-xl font-semibold capitalize text-gray-700">{title}</h1>
        <span className="pl-12 text-gray-600 text-sm">{content}</span>
        <span className="text-[10px] capitalize"> - by {author}</span>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <Image
          src={image}
          className="object-fill w-full py-1 -px-3 max-h-[584px] min-h-[300px]"

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

export default NewsCompo;
