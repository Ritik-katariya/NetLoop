import React from 'react'
import { useGetRequestQuery } from '../../redux/api/chatrequest';
import { useState } from 'react';
import { memberInfo } from '../../utils/auth';
import { MdFileDownloadDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Tooltip } from '@nextui-org/tooltip';
import { useDeleteRequestMutation } from '../../redux/api/chatrequest';
import { toast,ToastContainer } from 'react-toastify';
import { useUpdateChatMutation } from '../../redux/api/chat';
    
 


export default function ChatRequest({chatId}) {
  const [deleteRequest]=useDeleteRequestMutation();
  const [updateChat]=useUpdateChatMutation();
    const memberId=memberInfo().id;
    const { data, isLoading, isSuccess, isError, error } = useGetRequestQuery(memberId);

    
    const members={data:[]};
      const [searchTerm, setSearchTerm] = useState('');
      const filteredMembers =data?.filter(member =>
       member.sender?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

       const accepthandler=async({memberId,id})=> {
        try {
         
       
          await updateChat({id:chatId,data:{"memberId":memberId,
            "requestId":id

          }});
        } catch (error) {
          toast.error("failed to accept request");
        }
       }
       const rejecthandler=async(id)=> {
        try {
       
          await deleteRequest(id);
         
          toast.success("Request rejected successfully");
        } catch (error) {
          toast.error(error.message,"Request rejection failed");
        }
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
<ToastContainer/>
      <ul>
        {(filteredMembers && filteredMembers.length > 0) ? (
          filteredMembers.map((member) => (
            <li
              key={member.id}
             
              className={`flex items-center p-2 cursor-pointer hover:bg-gray-200 `}
            >
              <img
                className="w-8 h-8 rounded-full mr-3"
                src={member?.sender.profile?.img || "/default-profile.png"}
                alt={member?.sender.name || "User"}
              />
              <span>{member.sender.name}</span>
              <span className='w-full flex justify-end gap-8 text-xl pr-3 text-primary'>
              <Tooltip content="Cancel Request">
                <button onClick={()=>rejecthandler(member?.sender?.id)}>  
                <RxCross2 className='text-red-400 hover:bg-red-100 hover:text-red-500 hover:scale-105' /></button>
               </Tooltip>
               <Tooltip content="I am a tooltip" >
      
              <button onClick={()=>accepthandler({memberId:member?.sender?.id,id:member?.id})}>
              <MdFileDownloadDone className='text-teal-400 hover:bg-teal-100 hover:text-teal-500 hover:scale-105 ' />
              </button>
    </Tooltip>
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
