import React from "react";
import { Card, Button, Avatar } from "@nextui-org/react";
import UploadImg from "./UploadImg";
import { RiEditFill } from "react-icons/ri";
import { useGetProfileQuery } from "../../redux/api/profile";
import { useParams } from "react-router-dom";
import { memberInfo } from "../../utils/auth";
import { useGetMemberQuery } from "../../redux/api/member";
import { useState,useEffect } from "react";
import ProfileInfoEdit from "./ProfileInfoEdit/ProfileInfoEdit";
import CreatePost from "./Posts/CreatePost";

export default function ProfilePersonal() {
  const { id } = memberInfo()||"";
  const member = useParams();
  const{data:memberdata,error:merror,isLoading:misLoading,isSuccess:misSuccess}=useGetMemberQuery(member?.id);
  const [data, setdata] = useState({});
  useEffect(() => {
    
      setdata(memberdata?.profile);
    
  }, [misSuccess, memberdata]);


 
  return (
    <div className="bg-white">
      <div className="relative h-48 rounded-t-xl overflow-hidden bg-white">
        {/* Banner */}
        <img
          src={data?.coverImg||"https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
     {member?.id===id&& <div className="relative  lg:left-[790px] md:left-[340px] left-[240px] top-[-40px] z-[10]  w-12">
        <UploadImg id={memberdata?.profile?.id} img={data?.coverImg} flag={1} />
      </div>}

      {/* Profile Picture */}
      <div className="relative">
        <Avatar
          src={data?.img}
          className="absolute -bottom-16 md:-bottom-16 left-12 w-32 h-32 md:w-44 md:h-44  border-4 border-white bg-gray-400"
        />
       {member?.id===id&& <div className="absolute left-40 md:left-48 top-[20px] z-[10] w-12">
          <UploadImg id={memberdata?.profile?.id} img={data?.img} flag={0} />
        </div>}
      </div>

      {/* Profile Info */}
      <div className="mt-20 px-8">
        <div className="flex flex-col justify-center items-start">
          <div className="flex justify-between w-full items-center">
            <h1 className="text-2xl font-bold text-center md:pl-8">
              {memberdata?.name}
            </h1>
           { member?.id===id&&<div className="space-x-4 flex justify-end items-center ">
              <ProfileInfoEdit/>
              <CreatePost id={''}/>
              
            </div>}
          </div>

         {data?.bio&& <p className="text-gray-600 mt-1 text-sm text-center">{data?.bio}</p>}
        </div>
        <div className="flex gap-2 mt-1 text-gray-400 text-xs">
          <span>{data?.city}</span>
          <span>{data?.state}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-8 mt-6 pb-4 border-b ml-8 text-sm">
        <div className="text-center">
         
          <p className="text-gray-600 flex gap-2 hover:text-primary cursor-pointer">
          <p className="font-semibold">{memberdata?.networks?.length}</p>
            Network</p>
        </div>
        {/* <div className="text-center ">
          
          <p className="text-gray-600 flex gap-2 hover:text-primary cursor-pointer"> 
          <p className="font-semibold ">{profileData.stats.cluster}</p>
            Cluster</p>
        </div> */}
        {/* <div className="text-center ">
          <p className="text-gray-600 flex gap-2 hover:text-primary cursor-pointer" >
          <p className="font-semibold">{profileData.stats.known}</p>
            Known</p>
        </div> */}
      </div>

     <div>
        {/* <ProfileTab/> */}
     </div>
    </div>
  );
}
