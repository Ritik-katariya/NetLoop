import React, { useState,useEffect } from "react";
import { Card, Button, Image } from "@nextui-org/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { memberInfo } from "../../utils/auth";
import { useUpdateNetworkMemberMutation } from "../../redux/api/network";
import { toast, ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useToggleLikeMutation,useCheckLikeStatusQuery } from "../../redux/api/likeApi";
import JoinRequest from "../JoinRequest/JoinRequest";

const NetwrokCard = ({ value }) => {
  const [toggleLike, { isLoading: likeLoading, isError: likeError, isSuccess: likeSuccess }] = useToggleLikeMutation();
  const memberId = memberInfo()?.id;
  // State for like button
  const [like, setLike] = useState(value?.likes?.some((like) => like.memberId === memberId) || false);
  const {data:cehcklike}=useCheckLikeStatusQuery({memberId,targetId:value?.id,targetType:'network'})
  // console.log(value,"network",cehcklike)
  const handleLike =async () =>{ 
try {
  await toggleLike({memberId,targetType:'network',targetId:value?.id});
  if(likeSuccess)
  {toast.success("Successfully liked the network!");

  setLike(!like);

  }
else
  toast.error("Failed to like the network.");
} catch (error) {
  toast.error(error,"Failed to like the network.");
}
  }
  useEffect(()=>{
    setLike(cehcklike?.isLiked)
    
  },[cehcklike])



  return (
    <Card className="w-full max-w-md bg-white rounded-lg shadow-lg transition-transform hover:scale-105 flex flex-col items-center">
      {/* Network Cover Image */}
      <NavLink to={`/network/${value?.id}`}>
        <Image src={value?.cover} alt={value?.name} className="w-full h-44 rounded-t-lg object-cover" />
      </NavLink>

      <ToastContainer />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title & Like Button */}
        <div className="flex justify-between items-center relative">
          <NavLink to={`/network/${value?.id}`} className="text-lg font-bold text-gray-900 hover:text-cyan-500 transition-colors">
            {value?.name}
          </NavLink>

          {/* Like Button */}
          <div className="absolute right-2 -top-12 flex flex-col items-center">
            <button
              onClick={handleLike}
              className="text-lg text-red-600 bg-white rounded-full w-9 h-9 flex justify-center items-center hover:bg-gray-100 transition"
            >
              {like? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
            <span className="text-gray-600 text-xs">{value?.likes?.length}</span>
          </div>
        </div>

        {/* Member Count & Rating */}
        <div className="flex justify-between text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Members:</span>
            <span className="font-semibold">{value?.members?.length}</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="font-semibold">4.6</span>
            <span className="text-gray-500 text-xs">(3K)</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-gray-600 text-sm italic">Grow and thrive with us...</p>

        {/* Join Button */}
        <div className="w-full flex justify-center"><JoinRequest id={value.id}/></div>
      </div>
    </Card>
  );
};

export default NetwrokCard;
