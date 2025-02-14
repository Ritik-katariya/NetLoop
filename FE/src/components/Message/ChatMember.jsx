import React, { useState } from "react";
import { useGetMembersQuery,useGetMembersChatRequestQuery } from "../../redux/api/member";
import SendRequest from "./SendRequest";
import { memberInfo } from "../../utils/auth";
import { Avatar } from "@nextui-org/react";


export default function ChatMember({ chatData }) {
  const memberId = memberInfo().id;
  const { data } = useGetMembersQuery();
  const { data: v } = useGetMembersChatRequestQuery(memberId);
  // Filter members who are not already in the chat
  const chmembers =
  data?.data?.filter(
    (mem) => !chatData[0]?.members?.some((element) => element.id === mem.id)
  ) || [];
  // console.log(chmembers[0],v[0],"data");

  // Search filtering
  const [searchTerm, setSearchTerm] = useState("");
  const filteredMembers = v?.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      member.id !== memberId
  )||[];

  return (
    <div className="w-full bg-white border-r border-gray-300 mt-1 h-full shadow-sm">
      <div className="p-4 space-y-4">
        {/* Section Header */}
        <h2 className="text-xl font-semibold text-gray-700">All Members</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white text-gray-700"
        />

        {/* Members List */}
        <ul className="space-y-2">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <li
                key={member.id}
                className="flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-200"
              >
                <Avatar
                  className="w-10 h-10 rounded-full object-cover mr-3"
                  src={member?.profile?.img}
                  alt={member?.name || "User"}
                  
                />
                <span className="text-gray-800 flex-1 truncate">{member.name}</span>
                <SendRequest memberId={member?.id} />
              </li>
            ))
          ) : (
            <li className="text-gray-500 p-2">No matching members found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
