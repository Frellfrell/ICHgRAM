import React from "react";
import { Box, Typography } from "@mui/material";
import AppAvatar from "../ui/AppAvatar";


const SearchResults = ({ results, onUserClick }) => {
  const BE_URL = "http://localhost:5000";

  