import React, { useState } from 'react';
import { memberInfo } from '../../utils/auth';
import { Avatar } from '@nextui-org/react';


export default function ChatSidebar({ chatData, setActiveChat, activeChat }) {
  const [searchTerm, setSearchTerm] = useState('');
  const memberId=memberInfo().id;
console.log(chatData,"chat")
  // Filter members based on search term
  const filteredMembers = chatData && chatData[0]?.members?.filter(member =>
   { return member.name.toLowerCase().includes(searchTerm.toLowerCase())}
  );

  return (
    <div className="w-full bg-white border-r mt-1 h-full">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Chats</h2>
        
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <ul>
          {(filteredMembers && filteredMembers.length > 0) ? (
            filteredMembers.map((member) => (
              <li
                key={member.id}
                onClick={() => setActiveChat({ ...member, socketId: member.id })}
                className={`flex items-center p-2 cursor-pointer hover:bg-gray-200 ${
                  activeChat?.id === member.id ? "bg-blue-50 text-blue-500 font-semibold" : ""
                }`}
              >
                <Avatar
                  className="w-8 h-8 rounded-full mr-3"
                  src={member?.profile?.img }
                  alt={member?.name || "User"}
                />
                <span>{member.name}</span>
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