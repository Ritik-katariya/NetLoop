import { Divider } from "@heroui/divider";
import ChatSidebar from "./ChatSidebar";
import ChatMember from "./ChatMember";
import { useState } from "react";
import ChatRequest from "./ChatRequest";

export default function SideBar({ chatData, setActiveChat, activeChat }) {
  const [chat, setChat] = useState("chat");

  // Handler functions to avoid infinite loop
  const handleChatClick = () => {setChat("chat")

    setActiveChat(null)
  };
  const handleMemberClick = () => {setChat("member")
    setActiveChat(null)
  };
  const handleRequestClick = () => {setChat("request")
    setActiveChat(null)
  };

  return (
    <div className="w-[300px] max-h-screen flex flex-col bg-white">
      
        
        <div className="flex h-12 ml-2 items-center space-x-2 text-small w-full pt-3">
          <button
            onClick={handleChatClick}
            className={`cursor-pointer px-3 py-1 rounded-md transition-colors ${
              chat ==="chat"? "bg-blue-100 text-teal-600" : "hover:bg-gray-100"
            }`}
          >
            Chat
          </button>
          
          <button
            onClick={handleMemberClick}
            className={`cursor-pointer px-3 py-1 rounded-md transition-colors ${
              chat==="member" ? "bg-blue-100 text-teal-600" : "hover:bg-gray-100"
            }`}
          >
            Members
          </button>
          <button
            onClick={handleRequestClick}
            className={`cursor-pointer px-3 py-1 rounded-md transition-colors ${
              chat==="request" ? "bg-blue-100 text-teal-600" : "hover:bg-gray-100"
            }`}
          >
            Requests
          </button>
        </div>
      
      
      {chat==="chat" && 
        <ChatSidebar
          chatData={chatData}
          setActiveChat={setActiveChat}
          activeChat={activeChat}
        />
    }
      { chat==="member"&&
        <ChatMember  chatData={chatData}/>}
      
     { chat==="request"&&
        <ChatRequest chatId={chatData[0].id}/>}
      
    </div>
  );
}