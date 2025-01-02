import React from "react";
import { Card, Button, Avatar } from "@nextui-org/react";
import UploadImg from "./UploadImg";
import { RiEditFill } from "react-icons/ri";
import { MdAdd,MdModeEditOutline  } from "react-icons/md";
import { useGetProfileQuery } from "../../redux/api/profile";
import { useParams } from "react-router-dom";
import { memberInfo } from "../../utils/auth";
import { useGetMemberQuery } from "../../redux/api/member";
import { useState,useEffect } from "react";
import ProfileInfoEdit from "./ProfileInfoEdit/ProfileInfoEdit";

export default function ProfilePersonal() {
  const member = memberInfo();
  const{data:memberdata,error:merror,isLoading:misLoading,isSuccess:misSuccess}=useGetMemberQuery(member?.id);
  const [data, setdata] = useState({});
  useEffect(() => {
    
      setdata(memberdata?.profile);
    
  }, [misSuccess, memberdata]);

console.log(data)
  const profileData = {
   
    stats: {
      network: 3,
      cluster: 2,
      known: 45,
    }
   
  };
  return (
    <div className="bg-white">
      <div className="relative h-48 rounded-t-xl overflow-hidden bg-white">
        {/* Banner */}
        <img
          src={data?.coverImg}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative  lg:left-[790px] md:left-[340px] left-[240px] top-[-40px] z-[10]  w-12">
        <UploadImg id={memberdata?.profile?.id} img={data?.coverImg} />
      </div>

      {/* Profile Picture */}
      <div className="relative">
        <Avatar
          src={data?.img}
          className="absolute -bottom-16 md:-bottom-16 left-12 w-32 h-32 md:w-44 md:h-44  border-4 border-white bg-gray-400"
        />
      </div>

      {/* Profile Info */}
      <div className="mt-20 px-8">
        <div className="flex flex-col justify-center items-start">
          <div className="flex justify-between w-full items-center">
            <h1 className="text-2xl font-bold text-center md:pl-8">
              {memberdata?.name}
            </h1>
            <div className="space-x-4 flex justify-end items-center ">
              <ProfileInfoEdit/>
              <Button  className="w-24 h-8 bg-gray-100  hover:bg-teal-300 focus:font-semibold focus:text-blu-950 rounded-lg "> <MdAdd />Post</Button>
              
            </div>
          </div>

         {data?.bio&& <p className="text-gray-600 mt-1 text-sm text-center">{data?.bio}</p>}
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-8 mt-6 pb-4 border-b ml-8 text-sm">
        <div className="text-center">
         
          <p className="text-gray-600 flex gap-2 hover:text-primary cursor-pointer">
          <p className="font-semibold">{profileData.stats.network}</p>
            Network</p>
        </div>
        <div className="text-center ">
          
          <p className="text-gray-600 flex gap-2 hover:text-primary cursor-pointer"> 
          <p className="font-semibold ">{profileData.stats.cluster}</p>
            Cluster</p>
        </div>
        <div className="text-center ">
          <p className="text-gray-600 flex gap-2 hover:text-primary cursor-pointer" >
          <p className="font-semibold">{profileData.stats.known}</p>
            Known</p>
        </div>
      </div>

     <div>
        {/* <ProfileTab/> */}
     </div>
    </div>
  );
}
