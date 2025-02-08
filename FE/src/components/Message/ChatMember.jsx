import React from 'react'
import { useGetMembersQuery } from '../../redux/api/member'
import { useState } from 'react';
import SendRequest from './SendRequest';
import { memberInfo } from '../../utils/auth';
export default function ChatMember({chatData}) {
  const memberId=memberInfo().id;
    const { data, isLoading, isSuccess, isError, error } = useGetMembersQuery();
    
    const chmembers = data?.data?.filter(mem => {
        return !chatData[0]?.members?.some(element => element.id === mem.id);
      })||[];
      
      
      const [searchTerm, setSearchTerm] = useState('');
      const filteredMembers =chmembers?.filter(member =>
      {return member.name.toLowerCase().includes(searchTerm.toLowerCase())&&member.id!==memberId}
      );

       function requesthandler(e) {
        console.log(e);
       }
  return (
    <div className="w-full bg-white border-r mt-1 h-full">
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Members</h2>
      
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
              onClick={() => requesthandler({ ...member, socketId: member.id })}
              className={`flex items-center p-2 cursor-pointer hover:bg-gray-200 `}
            >
              <img
                className="w-8 h-8 rounded-full mr-3"
                src={member?.profile?.img || "/default-profile.png"}
                alt={member?.name || "User"}
              />
              <span>{member.name}</span>
             <span className='ml-4 mr-2 '>
             <SendRequest memberId={member?.id}/>
             </span>
            </li>
          ))
        ) : (
          <li className="text-gray-500 p-2">No matching chats found</li>
        )}
      </ul>
    </div>
  </div>
  )
}
