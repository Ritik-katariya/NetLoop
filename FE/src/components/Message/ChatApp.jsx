import React, { useState, useEffect, useRef } from "react";
import { memberInfo } from "../../utils/auth";
import { useGetMessageQuery, useCreateMessageMutation } from "../../redux/api/message";
import { Card, Button, Input, Avatar, Spinner } from "@nextui-org/react";
import { Paperclip, Send, FileImage, Smile } from "lucide-react";

export default function ChatApp({ activeChat, socket, setMessages, messages }) {
  const memberId = memberInfo().id;
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [createMessage, { isLoading: isLoadingMessage, isError: isErrorMessage }] = useCreateMessageMutation();
  const { data: msg } = useGetMessageQuery({ senderId: memberId, receiverId: activeChat?.socketId });

  useEffect(() => {
    setMessages(msg);
  }, [activeChat]);

  const handleSendMessage = () => {
    if (!message.trim() || !socket || !activeChat) return;

    const receiverId = activeChat.socketId;
    socket.emit("sendMessage", { senderId: memberId, receiverId, message, file });

    setMessages((prevMessages) => [...prevMessages, { senderId: memberId, receiverId, message, file }]);

    const formData = new FormData();
    formData.append("senderId", memberId);
    formData.append("receiverId", receiverId);
    formData.append("message", message);
    if (file) {
      formData.append("file", file);
    }

    createMessage({ data: formData });
    setMessage("");
    setFile(null);
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit("Typing", "Typing");

    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <div className="flex flex-col h-[90vh] bg-gray-100 rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center gap-3">
        <Avatar src={activeChat?.avatar} size="md" />
        <h3 className="font-semibold">{activeChat.name}</h3>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={lastMsgRef}>
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.senderId === memberId ? "justify-end" : "justify-start"}`}
          >
            <div
              ref={lastMsgRef}
              className={`max-w-xs p-3 rounded-xl shadow ${
                msg.senderId === memberId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.file && <img src={msg.file} alt="Sent file" className="rounded mb-2 max-w-full" />}
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
        {isTyping && <p className="text-gray-500 italic">Typing...</p>}
      </div>

      {/* Input Section */}
      <div className="p-4 bg-white border-t flex gap-2 items-center">
        <label className="cursor-pointer">
          <Paperclip className="text-gray-500 hover:text-blue-500" size={22} />
          <input type="file" className="hidden" onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))} />
        </label>
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
        <Button color="primary" onClick={handleSendMessage} isLoading={isLoadingMessage}>
          {isLoadingMessage ? <Spinner size="sm" /> : <Send />}
        </Button>
      </div>
    </div>
  );
}
