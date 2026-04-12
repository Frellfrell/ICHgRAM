import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";
import { BE_URL } from "../components/ui/helpers";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    if (isAuth) {
      const token = localStorage.getItem("token");

      const newSocket = io(BE_URL, {
        auth: { token },
      });

        setSocket(newSocket);
        