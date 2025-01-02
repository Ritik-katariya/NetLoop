import React, { useEffect } from "react";
import { IoPeople } from "react-icons/io5";
import { FaRegHeart,FaInstagram  } from "react-icons/fa";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { Button } from "@nextui-org/react";
import { MdModeEditOutline  } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import { useGetProfileQuery } from "../../redux/api/profile";
import { useState } from "react";
export default function ProfileInfo() {
  const id=useParams().id;
    const { data, error, isLoading, isSuccess } = useGetProfileQuery(id);
  const [detaildata, setDetaildata] = useState("")
  useEffect(()=>{
    setDetaildata(data?.details);
  },[data])
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
   
       <div className="bg-white p-4 w-2/5 text-xs rounded-md shadow-lg lg:h-[560px]">
        {detaildata?.overview&& <div>
            <h2 className="text-base font-semibold">Overview</h2>
           <p >{detaildata?.overview}</p>
        </div>}
            {detaildata?.interests?.lenth>0&&<div className="mt-6">
                <h2 className="text-base font-semibold mb-4">Interests</h2>
                <div className="flex flex-wrap gap-2">
                    {detaildata?.interests.map((interest) => (
                    <span
                        key={interest}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                        {interest}
                    </span>
                    ))}
                </div>
            </div>}
          
          {detaildata?.hobbie?.lenth>0&&<div className="mt-6">
            <h2 className="text-base font-semibold mb-4">Hobbies</h2>
            <div className="flex flex-wrap gap-2">
              {detaildata.hobbie.map((hobby) => (
                <span
                  key={hobby}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>}

          {/* Social Links */}
          {<div className="mt-6 pb-8">
            <h2 className="text-base font-semibold mb-4">Social</h2>
            <div className="space-y-2">
              <p className="flex cursor-pointer items-center gap-2" ><span className="font-semibold flex justify-center items-center gap-2"><IoPeople />
              Known: </span> {profileData.stats.known}</p>
              <p className="flex cursor-pointer items-center gap-2"><span className="font-semibold flex justify-center items-center gap-2"> <FaRegHeart />Solo: </span>{profileData.social.solo}</p>
              <p className="flex cursor-pointer items-center gap-2"><span className="font-semibold flex justify-center items-center gap-2"> <FaInstagram />Instagram: @</span>{profileData.social.instagram}</p>
              <p className="flex cursor-pointer items-center gap-2"><span className="font-semibold flex justify-center items-center gap-2"><TbBrandYoutubeFilled />YouTube: @</span>{profileData.social.youtube}</p>
            </div>

          </div>}
        <div className="flex justify-center items-center  font-semibold">
       <NavLink to={`/profile/details-edit/${detaildata?.id}`}>
       <Button className="bg-primary rounded-lg h-8 text-white text-base" ><MdModeEditOutline/> Details</Button>
       </NavLink>
        </div>
      </div>
   
  )
}
