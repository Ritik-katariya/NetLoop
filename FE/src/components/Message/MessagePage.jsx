import { SocketProvider } from "../../helpers/SocketContext";
import Header from "../Shared/Header/Header";
import Message from "./Message";
import React from "react";

export default function MessagePage() {
  return (
    <div>
      <Header />

      <SocketProvider>
        <Message />
      </SocketProvider>
    </div>
  );
}
