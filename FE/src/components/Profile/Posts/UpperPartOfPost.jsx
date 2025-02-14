import React from "react";
import { Avatar } from "@nextui-org/react";
import { getTimeAgo } from "../../../utils/timeAgoCreate";
import { useSelector } from "react-redux";
import { GiCheckMark } from "react-icons/gi"; 
import { useGetMemberQuery } from "../../../redux/api/member";
import { useNavigate } from "react-router-dom";
import OptionButton from "./ThreeDot";

const PostHeader = ({ post }) => {
  const navigate = useNavigate();
  const { 
    data: memberdata, 
    error: merror, 
    isLoading: misLoading, 
    isSuccess: misSuccess 
  } = useGetMemberQuery(post?.memberId);

  const name = memberdata?.name?.trim()?.split(" ")?.join("");
  
  const clickHandler = (e) => {
    e.preventDefault();
    navigate(`/${name}/${memberdata?.id}`);
  };

  const img = useSelector((state) => state.profile.img);

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
      {/* Left Section: Avatar & Member Info */}
      <div className="flex items-center gap-3">
        <Avatar
          src={memberdata?.profile?.img}
         
          className=" cursor-pointer hover:opacity-90 transition-all duration-200 w-12 h-12"
          onClick={clickHandler}
        />
        <div className="flex flex-col">
          {/* Member Name & Verified Badge */}
          <div className="flex items-center gap-2">
            <h3 
              className="text-lg font-medium  text-gray-700 cursor-pointer hover:text-primary transition-all duration-200" 
              onClick={clickHandler}
            >
              {memberdata?.name}
            </h3>
            {memberdata?.verified?.verified && <GiCheckMark className="text-primary text-lg" />}
          </div>

          {/* Network Name & Timestamp */}
          <div className="flex flex-col">
            {memberdata?.networks.length > 0 && (
              <p className="text-xs text-gray-500">{memberdata?.networks[0]?.name}</p>
            )}
            <span className="text-xs text-gray-400">
              {getTimeAgo(new Date(post?.createdAt))}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Options Button */}
      <OptionButton id={post?.id} />
    </div>
  );
};

export default PostHeader;
