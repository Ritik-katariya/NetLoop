import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { useGetChatQuery } from "../../redux/api/chat.js";
import { memberInfo } from "../../utils/auth.js";
import ChatApp from "./ChatApp.jsx";
import SideBar from "./SideBar.jsx";

import { setChatData, setMessages, addMessage } from "../../redux/feature/chatSlice.js";
import { baseUrl } from "../../helpers/config/envConfig.js";

const SOCKET_SERVER_URL = baseUrl;

function Message() {
  const memberId = memberInfo().id;
  const dispatch = useDispatch();

  const { memberData } = useSelector((state) => state.member);
  const { data: chat } = useGetChatQuery(memberId);
  const { chatData, activeChat, messages } = useSelector((state) => state.chat);

  const [socket, setSocket] = useState(null);

  // ✅ Update Redux state with chat data
  useEffect(() => {
    if (chat?.length) {
      dispatch(setChatData(chat));
    }
  }, [chat, dispatch]);

  // ✅ Setup socket connection
  useEffect(() => {
    if (!memberData?.id) return;

    const newSocket = io(SOCKET_SERVER_URL, {
      query: { userId: memberData.id },
    });

    // Handle new messages
    newSocket.on("newMessage", (messageData) => {
      console.log("New message received:", messageData);
      dispatch(addMessage(messageData));
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [memberData?.id, dispatch]);

  return (
    <div className="flex h-screen bg-gray-100 scroll-smooth ">
      <SideBar chatData={chatData} />
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <ChatApp socket={socket} />
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
