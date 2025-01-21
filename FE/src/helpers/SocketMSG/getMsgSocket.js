import React, { useEffect } from "react";
import { useSocketContext } from "../SocketContext.js";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../../redux/feature/chatSlice.js";
// import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const dispatch = useDispatch();
  const { socket } = useSocketContext(); // Access socket from context
  const messages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    if (socket) {
      // Listener for new messages
      socket.on("newMessage", (newMessage) => {
        // const notification = new Audio(sound);
        // notification.play();
        // Dispatch action to update the messages
        dispatch(setMessages([...messages, newMessage]));
      });

      // Cleanup on unmount or when socket disconnects
      return () => {
        socket.off("newMessage");
      };
    } else {
      console.error("Socket is not initialized");
    }
  }, [socket, dispatch, messages]); // Adding dispatch and messages to dependencies
};

export default useGetSocketMessage;
