import React, { useState, useEffect, useRef } from "react";
import { memberInfo } from "../../utils/auth";
import { useGetMessageQuery, useCreateMessageMutation } from "../../redux/api/message";
import { Card, Button, Input, Avatar, Spinner } from "@nextui-org/react";
import { Paperclip, Send } from "lucide-react";

export default function ChatApp({ activeChat, socket, setMessages, messages }) {
  const memberId = memberInfo().id;
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const isTypingRef = useRef(false);
  const typingTimeoutRef = useRef(null);
  const bottomRef = useRef(null);

  const { data: msg } = useGetMessageQuery({ senderId: memberId, receiverId: activeChat?.socketId });
  const [createMessage, { isLoading: isLoadingMessage }] = useCreateMessageMutation();

  useEffect(() => {
    if (msg && Array.isArray(msg)) {
      setMessages((prev) => (prev.length === msg.length ? prev : [...msg]));
    }
  }, [msg, setMessages]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (newMessage) => {
      if (
        newMessage.receiverId === memberId &&
        newMessage.senderId === activeChat?.socketId
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    socket.on("newMessage", handleReceiveMessage);

    return () => {
      socket.off("newMessage", handleReceiveMessage);
    };
  }, [socket, activeChat, memberId, setMessages]);

  const handleSendMessage = () => {
    if (!message.trim() || !socket || !activeChat) return;

    const receiverId = activeChat.socketId;
    const newMessage = { senderId: memberId, receiverId, message, file,createdAt:new Date() };

    socket.emit("sendMessage", newMessage);

    setMessages((prev) => [...prev, newMessage]);

    const formData = new FormData();
    formData.append("senderId", memberId);
    formData.append("receiverId", receiverId);
    formData.append("message", message);
    if (file) formData.append("file", file);
   

    createMessage({ data: formData });

    setMessage("");
    setFile(null);
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!isTypingRef.current) {
      isTypingRef.current = true;
      socket.emit("Typing", { receiverId: activeChat?.socketId, status: "Typing" });

      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        isTypingRef.current = false;
        socket.emit("Typing", { receiverId: activeChat?.socketId, status: "Stopped" });
      }, 2000);
    }
  };

  console.log(activeChat,"sdkfjsldj");
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[100vh] bg-gray-50  shadow-xl ">
      {/* Chat Header */}
      <div className="bg-white text-primary p-4 flex items-center gap-3 rounded-t-lg shadow-lg">
        <Avatar src={activeChat?.profile?.img} size="md" />
        <h3 className="font-semibold text-lg">{activeChat.name}</h3>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.senderId === memberId ? "justify-end" : "justify-start"} mb-4 px-2`}>
          <div className={`max-w-sm rounded-2xl shadow-lg transition-all ${
            msg.senderId === memberId 
              ? "bg-teal-400 text-white rounded-tr-none" 
              : "bg-gray-50 text-gray-800 rounded-tl-none border border-gray-200"
          }`}>
            {msg.file && (
              <img 
                src={msg.file} 
                alt="Sent file" 
                className="rounded-lg mx-auto mb-2 max-w-full h-auto hover:opacity-95 transition-opacity" 
              />
            )}
            <div className="p-3">
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {msg.message}
              </p>
              <p className={`text-xs mt-1.5 ${
                msg.senderId === memberId 
                  ? "text-blue-100" 
                  : "text-gray-500"
              }`}>
                {new Date(msg.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
        ))}
        {/* {isTypingRef.current && <p className="text-gray-500 italic text-sm">Typing...</p>} */}
        <div ref={bottomRef} />
      </div>

      {/* Input Section */}
      <div className="p-4 bg-white border-t flex gap-2 items-center rounded-b-lg">
        {/* <label className="cursor-pointer">
          <Paperclip className="text-gray-500 hover:text-blue-500" size={22} />
          <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
        </label> */}

        <Input
          value={message}
          onChange={handleTyping}
          placeholder="Type a message..."
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />

        <Button className="text-primary hover:text-teal-500 hover:scale-110" onClick={handleSendMessage} isLoading={isLoadingMessage}>
          {isLoadingMessage ? <Spinner size="sm" /> : <Send />}
        </Button>
      </div>
    </div>
  );
}
