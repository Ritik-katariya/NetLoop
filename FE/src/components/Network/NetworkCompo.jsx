import React, { useState, useEffect } from "react";
import { Card, Button, Image } from "@nextui-org/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { memberInfo } from "../../utils/auth";
import { useUpdateNetworkMemberMutation } from "../../redux/api/network";
import { toast, ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useToggleLikeMutation, useCheckLikeStatusQuery, useGetLikesQuery } from "../../redux/api/likeApi";
import JoinRequest from "../JoinRequest/JoinRequest";
import ReadMore from "../../utils/truncate";

const NetworkCard = ({ value }) => {
  const [toggleLike, { isLoading: likeLoading, isError: likeError, isSuccess: likeSuccess }] = useToggleLikeMutation();
  const memberId = memberInfo()?.id;
  const { data: likes } = useGetLikesQuery({ targetId: value?.id, targetType: 'network' });
  const [like, setLike] = useState(value?.likes?.some((like) => like.memberId === memberId) || false);
  const { data: checkLike } = useCheckLikeStatusQuery({ memberId, targetId: value?.id, targetType: 'network' });

  const handleLike = async () => { 
    try {
      await toggleLike({ data: { memberId, targetType: 'network', targetId: value?.id } });
      if (likeSuccess) {
        setLike(!like);
      }
    } catch (error) {
      toast.error("Failed to like the network.");
    }
  };

  useEffect(() => {
    setLike(checkLike?.isLiked);
  }, [checkLike]);

  return (
    <Card className="w-80 bg-white rounded-2xl shadow-lg transition-all hover:shadow-2xl hover:scale-105 overflow-hidden">
      <ToastContainer />

      {/* Cover Image */}
      <NavLink to={`/network/${value?.id}`}>
        <Image src={value?.cover} alt={value?.name} className="w-full h-48 object-cover" />
      </NavLink>

      <div className="p-5 space-y-4 relative">
        {/* Title & Like Button */}
        <div className="flex justify-between items-center">
          <NavLink to={`/network/${value?.id}`} className="text-xl font-semibold text-gray-900 hover:text-cyan-500 transition uppercase">
            <ReadMore text={value?.name} length={5} />
          </NavLink>
         
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLike}
              className="text-xl text-red-600 bg-white rounded-full w-10 h-10 flex justify-center items-center border border-gray-300 hover:bg-gray-100 transition"
            >
              {like ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
            <span className="text-gray-600 text-sm font-medium">{likes?.likes?.length}</span>
          </div>
        </div>
        {/* <span className="text-gray-600 text-xs">
            {value?.address}
          </span> */}
        {/* Member Count & Rating */}
        <div className="flex justify-between text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Members:</span>
            <span className="font-semibold">{value?.members?.length}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <span className="text-lg">★</span>
            <span className="font-semibold">4.6</span>
            <span className="text-gray-500 text-xs">(10)</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-gray-600 text-sm italic uppercase">
          <ReadMore text={value?.Slogan || "Let us grow together, enjoy the journey"} />
        </p>

        {/* Join Button */}
        <div className="w-full flex justify-center">
          <JoinRequest id={value.id} />
        </div>
      </div>
    </Card>
  );
};

export default NetworkCard;
