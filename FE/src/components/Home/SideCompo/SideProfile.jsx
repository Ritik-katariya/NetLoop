import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {Avatar, Modal} from "@nextui-org/react";
import Modalapp from "../../Shared/Modal/Modal";
import StoryModal from "../../Story/StoryCreateForm";
;
export default function SideProfile() {
  const { memberData } = useSelector((state) => ({
    memberData: state.member.memberData,
  }));

  return (
    <div className="w-[18%] mt-4 p-6 flex flex-col pt-9 text-sm max-lg:hidden  bg-gray-50 rounded-md h-[650px] shadow-md border-[.5px] max-xl:hidden">
      <div className="flex justify-center items-center flex-col border-b-2 pb-2">
        <Avatar showFallback
          src={memberData?.profile.img}
          alt="user"
          className="w-32 h-32 bg-gray-200 border-2 border-primary rounded-full object-fill cursor-pointer"
        />
          <h1 className="text-center text-black text-base font-semibold pt-3">
        <a to="/profile">
            {memberData?.name || "Guest"}
        </a>
          </h1>

        <h3 className="text-center text-xs text-gray-400 ">
          {memberData?.networks[0]?.name}
        </h3>
      </div>
      <div className="border-b-2 pb-2">
        <span className="flex justify-between items-center pt-2 ">
          <h3 className="text-lg font-semibold mb-2">Network</h3>
          <h3 className="text-lg font-semibold mb-2">
            {memberData?.networks?.length}
          </h3>
        </span>
        {memberData?.networks?.map((value) => (
          <h3 className="text-xs">{value?.name}</h3>
        ))}
      </div>
      {/* <div >
        <span className="flex justify-between items-center pt-4">
            <h3 className="text-lg font-semibold mb-2">Chanels</h3>
            <h3 className="text-lg font-semibold mb-2">2</h3>
        </span>
        {arr.map((value)=>(<h3>{value}</h3>))}
      </div> */}
      <div className="flex w-full justify-center">
    { memberData&&<StoryModal/>}

      </div>
    </div>
  );
}
