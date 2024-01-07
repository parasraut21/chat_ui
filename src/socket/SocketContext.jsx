import React, { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = io("https://chat-server2-ab56.onrender.com");

  useEffect(() => {
    // Add event listener for the "disconnect" event
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Cleanup event listener on component unmount
    return () => {
      socket.off("disconnect");
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
