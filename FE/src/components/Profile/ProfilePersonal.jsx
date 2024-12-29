import React from "react";
import { Card, Button, Avatar } from "@nextui-org/react";
import UploadImg from "./UploadImg";
import { RiEditFill } from "react-icons/ri";
import { MdAdd,MdModeEditOutline  } from "react-icons/md";
// import ProfileTab from "./ProfilePersonalTab";

export default function ProfilePersonal() {
  const profileData = {
    name: "Ritik Kumar",
    bio: "I am a Student at NIT Agartala 2026 | A Full stack Web developer In MERN Stack",
    stats: {
      network: 3,
      cluster: 2,
      known: 45,
    },
    interests: ["Sport Bike", "Super Cars", "Astronomy"],
    hobbies: ["Gym", "Watching Movies", "Photography"],
    social: {
      solo: "Solo",
      instagram: "ritik_katariya",
      youtube: "ritik_katariya__",
    },
  };
  return (
    <div className="bg-white">
      <div className="relative h-48 rounded-t-xl overflow-hidden bg-white">
        {/* Banner */}
        <img
          src="https://nextui.org/images/hero-card-complete.jpeg"
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative  lg:left-[790px] md:left-[340px] left-[240px] top-[-40px] z-[10]  w-12">
        <UploadImg />
      </div>

      {/* Profile Picture */}
      <div className="relative">
        <Avatar
          src="https://nextui.org/images/hero-card-complete.jpeg"
          className="absolute -bottom-16 md:-bottom-16 left-12 w-32 h-32 md:w-44 md:h-44  border-4 border-white bg-gray-400"
        />
      </div>

      {/* Profile Info */}
      <div className="mt-20 px-8">
        <div className="flex flex-col justify-center items-start">
          <div className="flex justify-between w-full items-center">
            <h1 className="text-2xl font-bold text-center md:pl-8">
              {profileData.name}
            </h1>
            <div className="space-x-4 flex justify-end items-center ">
              <Button  className="w-12 h-8 hover:bg-teal-300 focus:text-gray-500 rounded-full"> <MdModeEditOutline /></Button>
              <Button  className="w-24 h-8 bg-gray-100  hover:bg-teal-300 focus:font-semibold focus:text-blu-950 rounded-lg "> <MdAdd />Post</Button>
              
            </div>
          </div>

          <p className="text-gray-600 mt-1 text-sm text-center">{profileData.bio}</p>
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
