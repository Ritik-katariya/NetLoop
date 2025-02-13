import React, { useState } from "react";
import { memberInfo } from "../../utils/auth";
import { Avatar } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../../redux/feature/chatSlice";

export default function ChatSidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const memberId = memberInfo().id;
  const dispatch = useDispatch();

  const{ chatData, activeChat}=useSelector(state=>state.chat)
  // Filter members based on search term
  const filteredMembers =
    chatData?.[0]?.members?.filter((member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="w-full bg-white border-r border-gray-300 mt-1 h-full shadow-sm">
      <div className="p-4 space-y-4">
        {/* Section Header */}
        <h2 className="text-xl font-semibold text-gray-700">Your Chats</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white text-gray-700"
        />

        {/* Chat List */}
        <ul className="space-y-2">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <li
                key={member.id}
                onClick={() =>dispatch(setActiveChat({ ...member, socketId: member.id }))}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeChat?.id === member.id
                    ? "bg-gray-300 font-semibold shadow"
                    : "hover:bg-gray-200"
                }`}
              >
                <Avatar
                  className="w-10 h-10 rounded-full object-cover mr-3"
                  src={member?.profile?.img }
                  alt={member?.name || "User"}
                />
                <span className="truncate text-gray-800">{member.name}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 p-2">No matching chats found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
