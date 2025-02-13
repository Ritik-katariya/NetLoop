import React, { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "lodash";
import { memberInfo } from "../../utils/auth";
import { useGetMessageQuery, useCreateMessageMutation } from "../../redux/api/message";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/feature/chatSlice";

export default function ChatApp({ socket }) {
  const memberId = memberInfo().id;
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const { activeChat, messages } = useSelector((state) => state.chat);

  const { data: msg, isSuccess } = useGetMessageQuery(
    { senderId: memberId, receiverId: activeChat?.socketId },
    { skip: !activeChat }
  );

  useEffect(() => {
    if (isSuccess && msg) {
      dispatch(setMessages(msg));
    }
  }, [msg, dispatch, isSuccess]);

  const [createMessage] = useCreateMessageMutation();

  const handleSendMessage = async () => {
    if (!message.trim() || !socket || !activeChat) return;

    const receiverId = activeChat.socketId;
    const newMessage = { senderId: memberId, receiverId, message, file };

    socket.emit("sendMessage", newMessage, (ack) => {
      if (ack.success) {
        dispatch(setMessages([...messages, newMessage]));
      }
    });

    const formData = new FormData();
    formData.append("senderId", memberId);
    formData.append("receiverId", receiverId);
    formData.append("message", message);
    if (file) formData.append("file", file);

    await createMessage({ data: formData });
    setMessage("");
    setFile(null);
  };

  const handleTyping = useCallback(
    debounce((text) => {
      socket.emit("Typing", "Typing...");
    }, 500),
    [socket]
  );

  const handleChange = (e) => {
    setMessage(e.target.value);
    handleTyping(e.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const lastMsgRef = useRef(null);
  useEffect(() => {
    lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              {activeChat?.name?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {activeChat?.name || "Select a chat"}
              </h3>
              {/* {activeChat?.status && (
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm text-gray-600">Online</span>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages?.map((msg, index) => (
            <div
              key={index}
              ref={index === messages.length - 1 ? lastMsgRef : null}
              className={`flex ${msg.senderId === memberId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] ${
                  msg.senderId === memberId
                    ? "bg-teal-400 text-white rounded-l-2xl rounded-tr-2xl"
                    : "bg-white text-gray-800 rounded-r-2xl rounded-tl-2xl shadow-sm"
                } px-4 py-2`}
              >
                <p className="mb-1 break-words">{msg.message}</p>
                <div className={`text-xs ${
                  msg.senderId === memberId ? "text-blue-100" : "text-gray-500"
                } flex items-center justify-end gap-1`}>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {formatTime(msg.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t p-4 bg-white">
        <div className="flex items-center space-x-2">
          {/* <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          /> */}
          {/* <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button> */}
          <input
            value={message}
            onChange={handleChange}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-full focus:outline-none focus:border-teal-400 bg-gray-50"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`p-2 rounded-full ${
              message.trim()
                ? "bg-teal-400 hover:bg-teal-500 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            } transition-colors`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
        {file && (
          <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            <span>{file.name}</span>
            <button
              onClick={() => setFile(null)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}