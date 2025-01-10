import React from "react";
import { useState } from "react";
import { Card, Button } from "@nextui-org/react";
import { FaRegHeart,FaHeart  } from "react-icons/fa";
import { memberInfo } from "../../utils/auth";
import { useUpdateNetworkMemberMutation } from "../../redux/api/network";
import { toast,ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
const NetwrokCard = ({ value }) => {
  const [updateNetworkMember, { isLoading, isSuccess,isError,error }] = useUpdateNetworkMemberMutation();

  const memberId=memberInfo().id;
  const [like, setlike] = useState(false);
  const likehandler= async()=>{
    setlike(!like);
  }

  const joinhandler= async()=>{
     
  
    const formData=new FormData();
    formData.append("memberId", memberId);
    formData.append("networkId", value?.id);
    try {
      await updateNetworkMember({data: formData});
     if(isSuccess) toast.success("Member join successfully");
     else toast.error("Member join failed",error);
      
    } catch (error) {
      console.error(error);
      toast.error("Failed to join network");
    }

  }
  return (
    <Card className="max-w-md max-h-96  space-y-1 bg-white rounded-lg shadow-lg">
      {/* Background Image */}
      

       <NavLink to={`/network/${value?.id}`}>
       <img src={value?.cover} alt={value?.name} className="w-full h-44" />
       </NavLink>
           <ToastContainer/>
      {/* Content */}
      <div className=" px-2">
        <div className="flex justify-between items-center">
       <NavLink to={`/network/${value?.id}`}>

        <h2 className="text-lg font-mono font-bold capitalize cursor-pointer">{value?.name}</h2></NavLink>
          <div className="absolute right-6 top-40">
            <div className="flex flex-col ">
              <span className="text-lg text-red-600 cursor-pointer rounded-full bg-[#ffffffde] w-8 h-8 flex justify-center items-center hover:scale-105" onClick={likehandler}>{like?<FaHeart />:<FaRegHeart />}</span>
              <span className="text-gray-600 text-xs w-8 text-center">{value?.likes?.length}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between px-4 text-sm items-center my-3">
        <div className="space-y-2">
          {/* <div className="flex items-center gap-2">
            <span className="text-gray-500">Cluster</span>
            <span className="font-semibold">20</span>
          </div> */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Member</span>
            <span className="font-semibold">{value?.members.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-center" >
          <span className="text-cyan-400 text-xl">★</span>
          <span className="font-semibold ">4.6</span>
          <span className="text-gray-600 text-xs">3k</span>
        </div>
        </div>

        <p className="text-gray-600 m-2 text-sm">Grow and Joy with us...</p>

       <div className="w-full h-12 flex justify-center items-center m-2">
       <Button className="w-32 h-10 bg-cyan-400 text-white py-3 rounded-lg text-xl font-mono hover:bg-cyan-500 transition-colors" onClick={joinhandler} disabled={isLoading}>
          {isLoading?"Loading..":"Join"}
        </Button>
       </div>
      </div>
    </Card>
  );
};

export default NetwrokCard;
