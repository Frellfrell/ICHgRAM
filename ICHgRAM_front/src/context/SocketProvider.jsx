import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext.jsx";
import { BE_URL } from "../components/ui/helpers.js";

export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!isAuth) return;
    const token = localStorage.getItem("token");

    socketRef.current = io(BE_URL, {
      auth: { token },
    });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [isAuth]);

  {
    /*const newSocket = io(BE_URL, {
        auth: { token },
      });

      setSocket(newSocket);

       return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [isAuth]);*/
  }

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
