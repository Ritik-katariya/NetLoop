// import React from "react";
import { memberInfo } from "../../utils/auth";
import { useGetMessageQuery } from "../../redux/api/message";
import { useCreateMessageMutation } from "../../redux/api/message";
import React, { useState, useEffect,useRef } from "react";
import { Card, Button, Input } from "@nextui-org/react";

export default function ChatApp({activeChat,socket,setMessages,messages}) {
    const memberId=memberInfo().id; 
    const [file, setFile] = useState(null)
    const [message, setMessage] = useState("");
   
      

const [createMessage, { isLoading: isLoadingMessage, isError: isErrorMessage }] = useCreateMessageMutation();
const {data:msg}=useGetMessageQuery({senderId:memberId,receiverId:activeChat?.socketId})


    useEffect(() => {
            setMessages(msg);
    },[activeChat]);

  const handleSendMessage = () => {
    if (!message.trim() || !socket || !activeChat) return;

    const receiverId = activeChat.socketId;
   

    socket.emit("sendMessage", { senderId:memberId, receiverId, message ,file});
    setMessages((prevMessages) => [...prevMessages, { senderId:memberId, receiverId, message ,file}]);

    const formData = new FormData();
    formData.append("senderId", memberId);
    formData.append("receiverId", receiverId);
    formData.append("message", message);

    if (file) {
      formData.append("file", file);
    }


    createMessage({data:formData});
  
    setMessage("");
  };


  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit("Typing","Typing");
  };

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);

  return (
    <>
      <div className="bg-white p-4 shadow mt-1 ">
        <h3 className="font-bold">{activeChat.name}</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 " ref={lastMsgRef}>
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 chat ${
              msg.senderId === memberId ? "text-right" : "text-left"
            }`}
          >
            <div ref={lastMsgRef}
              className={`inline-block p-2 rounded-lg  chat-bubble  ${
                msg.senderId === memberId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t">
        <div className="flex gap-2">
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
          <Button color="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      </div>
    </>
  );
}