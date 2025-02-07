import React from "react";
import { useGetMembersQuery } from "../../../redux/api/member";
import { getTimeAgo } from "../../../utils/timeAgoCreate";
import { useGetNetworksQuery } from "../../../redux/api/network";

export default function SideNotify() {
  const { data: netrData } = useGetNetworksQuery();
  const { data: membersData, isLoading, isSuccess, error } = useGetMembersQuery();

  return (
    <div className="w-[18%] mt-4 p-4 flex flex-col gap-6 max-lg:hidden bg-gray-50 rounded-lg h-[650px] shadow-lg border border-gray-200 max-xl:hidden">
      
      {/* Members Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-base font-medium text-gray-700">Members</h1>
          <h1 className="text-xs text-gray-600">Recent join</h1>
        </div>
        
        {membersData?.data?.map((member, index) => (
          <div key={index} className="flex justify-between items-center border-b py-2">
            <h3 className="text-gray-600 text-xs">{member?.name}</h3>
            <h3 className="text-gray-500 text-[10px]">{getTimeAgo(new Date(member?.created_at))}</h3>
          </div>
        ))}
      </div>

      {/* Networks Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-base font-medium text-gray-700">Networks</h1>
          <h1 className="text-xs text-gray-600">Recent join</h1>
        </div>
        
        {netrData?.map((network, index) => (
          <div key={index} className="flex justify-between items-center border-b py-2 gap-1">
            <h3 className="text-gray-600 text-xs">{network?.name}</h3>
            <h3 className="text-gray-500 text-[10px]">{getTimeAgo(new Date(network?.createdAt))}</h3>
          </div>
        ))}
      </div>

    </div>
  );
}
