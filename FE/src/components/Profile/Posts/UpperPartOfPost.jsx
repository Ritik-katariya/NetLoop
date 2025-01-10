import React from "react";
import { Avatar } from "@nextui-org/react";
import { getTimeAgo } from "../../../utils/timeAgoCreate";
import { useSelector } from "react-redux";
import MenuModal from "./ThreeDot";
import CreatePost from "./CreatePost";
import OptionButton from "./ThreeDot";
import { GiCheckMark } from "react-icons/gi";
import { useGetMemberQuery } from "../../../redux/api/member";
const PostHeader = ({ post }) => {
  const {
    data: memberdata,
    error: merror,
    isLoading: misLoading,
    isSuccess: misSuccess,
  } = useGetMemberQuery(post?.memberId);
 

  const img = useSelector((state) => state.profile.img);

  return (
    <div className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center gap-3">
        <Avatar
          src={memberdata?.profile?.img}
          size="md"
          className="border-2 border-primary"
        />
          <div className="flex flex-col">
            <div className="flex justify-start items-center gap-4">
            <h3 className="text-base font-semibold">{memberdata?.name}</h3>
            {memberdata?.verified && <GiCheckMark className="text-primary" />}
            <span className="text-xs text-gray-400 ml-2">
              {getTimeAgo(new Date(post?.createdAt))}
            </span>
            </div>
           {memberdata?.networks.length > 0 && (<p className="text-[10px] text-gray-500">{memberdata?.networks[0]?.name}</p>)}
          </div>
      </div>
      <OptionButton id={post?.id} />
    </div>
  );
};

export default PostHeader;
