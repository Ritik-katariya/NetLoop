import { Server, Socket } from "socket.io";
import prisma from "../shared/prisma";
import { Message } from "@prisma/client";
import http from "http";
import express from "express";
import config from "../config";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const users: Record<string, string> = {}; // Maps userId to socketId

// Utility function to get a user's socket ID
export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return users[receiverId];
};

// Listen for socket connections
io.on("connection", (socket: Socket) => {
  console.log("A user connected:", socket.id);

  // Extract the userId from the handshake query
  const userId = socket.handshake.query.userId as string | undefined;

  if (userId) {
    users[userId] = socket.id; // Map userId to socketId
    console.log("Users mapping:", users);

    // Notify all connected clients of online users
    io.emit("getOnlineUsers", users);
  }

  // Handle message sending
  socket.on("sendMessage", ({ message, senderId,receiverId,file }) => {
    // console.log("Message received:", content, "to receiver socket:", receiverSocketId);
    try {
      async (message:string,senderId:string,receiverId:string,file:any) => {
        await prisma.message.create({data:{
          senderId,
          receiverId,
          message,
          file,
        }})
        
      }
    } catch (error) {
      console.log("something went wrong")
    }
    console.log("user",users[receiverId],receiverId);
    if (receiverId && users[receiverId]) {
      io.to(users[receiverId]).emit("newMessage", {
        message, senderId,receiverId,file 
      });
      console.log("msg send",{ message, senderId,receiverId,file })
    } else {
      console.log("Receiver socket not found or invalid:", receiverId);
    }
   
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    // Remove the user from the users object
    const disconnectedUserId = Object.keys(users).find((key) => users[key] === socket.id);
    if (disconnectedUserId) {
      delete users[disconnectedUserId];
      console.log("Updated users mapping after disconnect:", users);

      // Notify all connected clients of the updated online users
      io.emit("getOnlineUsers", users);
    }
  });
});

export { app, io, server };