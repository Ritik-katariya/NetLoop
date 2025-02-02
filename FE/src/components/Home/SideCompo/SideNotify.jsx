import React from "react";
import { useGetMembersQuery } from "../../../redux/api/member";
import { getTimeAgo } from "../../../utils/timeAgoCreate";
import { useGetNetworksQuery } from "../../../redux/api/network";
export default function SideNotify() {
  const {data:netrData}=useGetNetworksQuery();
  const { data, isLoading, isSuccess, error } = useGetMembersQuery();
  
  return (
    <div className="w-[18%] mt-4 p-6 flex flex-col gap-6 bg-gray-50 rounded-md h-[650px] shadow-md border-[.5px] max-xl:hidden">
      <div>
        <span className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mb-2">Members</h1>
        <h1 className="text-base font-semibold mb-2">Recent join</h1>
        </span>
        
        {data?.data.map(member =>(
          <span className="flex justify-between items-center ">
          <h3 className="text-gray-400">{member?.name}</h3>
          <h3 className="text-gray-500 text-xs ">{getTimeAgo(new Date(member?.created_at))}</h3>
        </span>
        ))}
      </div>
      <div >
      <span className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mb-2">Networks</h1>
        <h1 className="text-base font-semibold mb-2">Recent join</h1>
        </span>
       {
        netrData?.map(network =>(
          <span className="flex justify-between items-center text-xs ">
          <h3 className="text-gray-400">{network?.name}</h3>
          <h3 className="text-gray-500 text-[10px] ">{getTimeAgo(new Date(network?.createdAt))}</h3>
        </span>
        ))
       }
      </div>
    </div>
  );
}
