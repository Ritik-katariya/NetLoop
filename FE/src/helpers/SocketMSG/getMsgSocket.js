import React, { useEffect } from "react";
import { useSocketContext } from "../SocketContext.js";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../../redux/feature/chatSlice.js";
// import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const { activeChat } = useSelector((state) => state.chat);
  const { memberData } = useSelector((state) => state.member);

  useEffect(() => {
    if (!socket || !memberData?.id) return;

    // Listener for new messages
    const handleNewMessage = (newMessage) => {
      console.log("New message received:", newMessage);
      
      // Only add message if it's for the current chat
      if (
        activeChat && 
        ((newMessage.senderId === activeChat.id && newMessage.receiverId === memberData.id) ||
         (newMessage.senderId === memberData.id && newMessage.receiverId === activeChat.id))
      ) {
        dispatch(addMessage(newMessage));
      }
    };

    socket.on("newMessage", handleNewMessage);

    // Cleanup
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch, activeChat, memberData?.id]);
};

export default useGetSocketMessage;
