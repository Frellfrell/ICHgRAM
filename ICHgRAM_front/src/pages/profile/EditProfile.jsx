import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Avatar,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import MainLayout from "../../layouts/MainLayout";
import AppTypography from "../ui/AppTypography";
import axiosInstance from "../../api/axiosInstance";
import { formatUrl } from "../ui/helpers";
import { useNavigate } from "react-router-dom";
import AppButton from "../ui/AppButton";
import LinkIcon from "@mui/icons-material/Link";


const EditProfile = () => {
  const navigate = useNavigate();

