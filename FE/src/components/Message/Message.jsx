import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { Card, Button, Input } from "@nextui-org/react";
import { useGetMembersQuery } from "../../redux/api/member";
import { setMessages } from "../../redux/feature/chatSlice.js";
// import { useGetChatQuery } from "../../redux/api/chat.js";
import { useGetMessageQuery } from "../../redux/api/message.js";
import { useCreateMessageMutation } from "../../redux/api/message.js";
import { useGetChatQuery } from "../../redux/api/chat.js";
import { memberInfo } from "../../utils/auth.js";




const SOCKET_SERVER_URL = process.env.REACT_APP_SERVER_API_BASE_URL || "http://localhost:5050";



function Message() {
const memberId=memberInfo().id;
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const { data, isLoading, isError } = useGetMembersQuery();
  const { memberData } = useSelector((state) => state.member);
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null)
  const {data:msg}=useGetMessageQuery({senderId:memberData?.id,receiverId:activeChat?.socketId})
  const [createMessage, { isLoading: isLoadingMessage, isError: isErrorMessage }] = useCreateMessageMutation();
  const {data: chatData } = useGetChatQuery(memberId);

// console.log(chatData[0].members,"chat data")

   const dispatch = useDispatch();
   const [members, setmembers] = useState(null);


   useEffect(()=>{
    console.log("members",data)
    if(data){
      const filterdata=data?.data.filter((data)=>data.id!==memberData?.id);
      setmembers(filterdata);
    }
   },[data])


   useEffect(() => {
        setMessages(msg);
  },[activeChat]);
  
  // Initialize socket connection
  useEffect(() => {
    if (!memberData?.id) return;

    const newSocket = io(SOCKET_SERVER_URL, {
      query: { userId: memberData.id },
    });

    newSocket.on("connect", () => {
      console.log("Connected to server with socket ID:", newSocket.id);
    });

    newSocket.on("getOnlineUsers", (onlineUsers) => {
      console.log("Online users:", onlineUsers);
    });

    newSocket.on("newMessage", ({senderId, receiverId, message ,file}) => {
      console.log("New message received:", {senderId, receiverId, message ,file});
      setMessages((prevMessages) => [...prevMessages, {senderId, receiverId, message ,file}]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [memberData?.id,messages,activeChat]);

  const handleSendMessage = () => {
    if (!message.trim() || !socket || !activeChat) return;

    const receiverId = activeChat.socketId;
    console.log("Sending message to:", receiverId);

    socket.emit("sendMessage", { senderId:memberData?.id, receiverId, message ,file});
    setMessages((prevMessages) => [...prevMessages, { senderId:memberData?.id, receiverId, message ,file}]);

    const formData = new FormData();
    formData.append("senderId", memberData?.id);
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

  if (isLoading) return <div>Loading members...</div>;
  if (isError || !data) return <div>Error loading members.</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full sm:w-1/4 bg-white border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Chats</h2>
          <ul>
            {(chatData&&chatData[0]?.members)&&chatData[0].members?.map((member) => (
              <li
                key={member.id}
                onClick={() => setActiveChat({ ...member, socketId: member.id })}
                className={`flex items-center p-2 cursor-pointer hover:bg-gray-200 ${
                  activeChat?.id === member.id ? "bg-blue-50 text-blue-500 font-semibold" : ""
                }`}
              >
                <img
                  className="w-8 h-8 rounded-full mr-3"
                  src={member?.profile?.img || "/default-profile.png"}
                  alt={member?.name || "User"}
                />
                <span>{member.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            <div className="bg-white p-4 shadow">
              <h3 className="font-bold">{activeChat.name}</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages?.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${msg.senderId === memberData?.id ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      msg.senderId === memberData?.id ? "bg-blue-500 text-white" : "bg-gray-200"
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
