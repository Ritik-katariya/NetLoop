import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { useGetChatQuery } from "../../redux/api/chat.js";
import { memberInfo } from "../../utils/auth.js";
import ChatApp from "./ChatApp.jsx";
import ChatSidebar from "./ChatSidebar.jsx";
import { SocketProvider } from "../../helpers/SocketContext.js";
import SideBar from "./SideBar.jsx";




const SOCKET_SERVER_URL = process.env.REACT_APP_SERVER_API_BASE_URL || "http://localhost:5050";



function Message() {
const memberId=memberInfo().id;
  const [socket, setSocket] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const { memberData } = useSelector((state) => state.member);
  const [messages, setMessages] = useState([]);
  const {data: chatData } = useGetChatQuery(memberId);


  useEffect(() => {
    if (!memberData?.id) return;

    const newSocket = io(SOCKET_SERVER_URL, {
      query: { userId: memberData.id },
    });

    newSocket.on("connect", () => {
    
    });

    newSocket.on("getOnlineUsers", (onlineUsers) => {
      
    });

    newSocket.on("newMessage", ({senderId, receiverId, message ,file}) => {
      setMessages((prevMessages) => [...prevMessages, {senderId, receiverId, message ,file}]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [memberData?.id,messages,activeChat]);


  return (
    <div className="flex h-screen bg-gray-100 scroll-smooth mt-16 ">
      <SideBar chatData={chatData} setActiveChat={setActiveChat} activeChat={activeChat}/>
      <div className="flex-1 flex flex-col">
        {activeChat ? (<ChatApp activeChat={activeChat} setMessages={setMessages} messages={messages} socket={socket}/>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
