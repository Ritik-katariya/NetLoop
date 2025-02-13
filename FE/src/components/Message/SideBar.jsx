import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveChat } from "../../redux/feature/chatSlice";

import ChatSidebar from "./ChatSidebar";
import ChatMember from "./ChatMember";
import ChatRequest from "./ChatRequest";

export default function SideBar() {
  const [chat, setChat] = useState("chat");
  const { chatData } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  // ✅ Optimized handler functions with `useCallback`
  const handleChatClick = useCallback(() => {
    setChat("chat");
    dispatch(setActiveChat(null));
  }, [dispatch]);

  const handleMemberClick = useCallback(() => {
    setChat("member");
    dispatch(setActiveChat(null));
  }, [dispatch]);

  const handleRequestClick = useCallback(() => {
    setChat("request");
    dispatch(setActiveChat(null));
  }, [dispatch]);

  return (
    <div className="w-[300px] max-h-screen flex flex-col bg-white">
      {/* ✅ Button Group */}
      <div className="flex h-12 ml-2 items-center space-x-2 text-small w-full pt-3">
        <button
          onClick={handleChatClick}
          className={`cursor-pointer px-3 py-1 rounded-md transition-colors ${
            chat === "chat" ? "bg-blue-100 text-teal-600" : "hover:bg-gray-100"
          }`}
        >
          Chat
        </button>

        <button
          onClick={handleMemberClick}
          className={`cursor-pointer px-3 py-1 rounded-md transition-colors ${
            chat === "member" ? "bg-blue-100 text-teal-600" : "hover:bg-gray-100"
          }`}
        >
          Members
        </button>

        <button
          onClick={handleRequestClick}
          className={`cursor-pointer px-3 py-1 rounded-md transition-colors ${
            chat === "request" ? "bg-blue-100 text-teal-600" : "hover:bg-gray-100"
          }`}
        >
          Requests
        </button>
      </div>

      {/* ✅ Conditional Rendering for Sidebar Content */}
      {chat === "chat" && <ChatSidebar />}
      {chat === "member" && <ChatMember chatData={chatData} />}
      {chat === "request" && <ChatRequest chatId={chatData?.length > 0 ? chatData[0].id : null} />}
    </div>
  );
}
