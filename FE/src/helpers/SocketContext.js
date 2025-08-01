import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "./config/envConfig";
import io from "socket.io-client"
const socketContext = createContext();
const SOCKET_SERVER_URL =baseUrl;
// it is a hook.
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
    const { memberData } = useSelector((state) => state.member);  
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  

  useEffect(() => {
    if (memberData) {
      const socket = io(SOCKET_SERVER_URL, {
        query: {
          userId: memberData?.id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [memberData]);
  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};