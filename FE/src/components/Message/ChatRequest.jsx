import React, { useState } from 'react';
import { useGetRequestQuery, useDeleteRequestMutation } from '../../redux/api/chatrequest';
import { useUpdateChatMutation } from '../../redux/api/chat';
import { memberInfo } from '../../utils/auth';
import { MdFileDownloadDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Tooltip } from '@nextui-org/tooltip';
import { toast, ToastContainer } from 'react-toastify';
import { Avatar } from '@nextui-org/react';

export default function ChatRequest({ chatId }) {
  const memberId = memberInfo().id;
  const { data, isLoading } = useGetRequestQuery(memberId);
  const [deleteRequest] = useDeleteRequestMutation();
  const [updateChat] = useUpdateChatMutation();
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMembers = data?.filter(member =>
    member.sender?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const accepthandler = async ({ memberId, id }) => {
    try {
      await updateChat({ id: chatId, data: { memberId, requestId: id } });
      toast.success("Request accepted successfully");
      window.location.reload();
    } catch {
      toast.error("Failed to accept request");
    }
  };

  const rejecthandler = async (id) => {
    try {
      await deleteRequest(id);
      toast.success("Request rejected successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Request rejection failed");
    }
  };

  return (
    <div className="w-full bg-white border-r shadow-lg rounded-lg mt-1 h-full">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Chat Requests</h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <ToastContainer />

        {/* Chat Request List */}
        <ul className="space-y-4">
          {isLoading ? (
            <li className="text-gray-500 p-2">Loading requests...</li>
          ) : filteredMembers && filteredMembers.length > 0 ? (
            filteredMembers.map((chat) => (
              <li key={chat?.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition duration-200">
                
                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <Avatar
                  // showFallback name={chat?.sender?.name?.toLowerCase().split()[0]}
                    className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
                    src={chat?.sender?.profile?.img }
                    alt={chat?.sender?.name || "User"}
                  />
                  <span className="text-gray-800 font-medium">{chat.sender.name}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  {/* Reject Button */}
                  <Tooltip content="Reject Request">
                    <button
                      onClick={() => rejecthandler(chat?.id)}
                      className="p-2 rounded-full text-red-500 hover:bg-red-100 hover:text-red-600 transition duration-150"
                    >
                      <RxCross2 size={22} />
                    </button>
                  </Tooltip>

                  {/* Accept Button */}
                  <Tooltip content="Accept Request">
                    <button
                      onClick={() => accepthandler({ memberId: chat?.sender?.id, id: chat?.id })}
                      className="p-2 rounded-full text-teal-500 hover:bg-teal-100 hover:text-teal-600 transition duration-150"
                    >
                      <MdFileDownloadDone size={22} />
                    </button>
                  </Tooltip>
                </div>

              </li>
            ))
          ) : (
            <li className="text-gray-500 p-2">No matching requests found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
