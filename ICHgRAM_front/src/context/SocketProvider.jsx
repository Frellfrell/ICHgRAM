import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext.jsx";
import { SocketContext } from "./SocketContext.jsx";
import { BE_URL } from "../components/ui/helpers.js";

const SocketProvider = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!isAuth) return;
    const token = localStorage.getItem("token");

    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [isAuth]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
