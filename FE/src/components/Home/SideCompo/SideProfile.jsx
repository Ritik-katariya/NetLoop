import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "@nextui-org/react";
import StoryModal from "../../Story/StoryCreateForm";

export default function SideProfile() {
  const { memberData } = useSelector((state) => ({
    memberData: state.member.memberData,
  }));

  return (
    <div className="w-[18%] mt-4 p-4 flex flex-col text-sm bg-gray-50 rounded-lg h-[650px] shadow-lg border border-gray-200 max-lg:hidden max-xl:hidden">
      
      {/* Profile Section */}
      <div className="flex flex-col items-center border-b pb-3">
        <Avatar 
          showFallback
          src={memberData?.profile?.img}
          alt="user"
          className="w-32 h-32 bg-gray-200 border-2 border-primary rounded-full object-cover shadow-md"
        />
        <h1 className="text-center text-gray-800 text-lg font-semibold pt-3">
          <Link to="/profile" className="hover:text-primary transition-all duration-200">
            {memberData?.name || "Guest"}
          </Link>
        </h1>
        <h3 className="text-center text-xs text-gray-500">
          {memberData?.networks?.[0]?.name || "No Network"}
        </h3>
      </div>

      {/* Networks Section */}
      <div className="border-b pb-3">
        <div className="flex justify-between items-center pt-2">
          <h3 className="text-lg font-semibold text-gray-700">Networks</h3>
          <h3 className="text-lg font-semibold text-gray-800">
            {memberData?.networks?.length || 0}
          </h3>
        </div>
        {memberData?.networks?.map((value, index) => (
          <h3 key={index} className="text-sm text-gray-600">
            {value?.name}
          </h3>
        ))}
      </div>

      {/* Story Modal Section */}
      <div className="flex w-full justify-center mt-4">
        {memberData && <StoryModal />}
      </div>

    </div>
  );
}
