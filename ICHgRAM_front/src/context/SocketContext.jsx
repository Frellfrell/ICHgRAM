import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";
import { formatUrl } from "../components/ui/helpers";

export const SocketContext = createContext(null);
