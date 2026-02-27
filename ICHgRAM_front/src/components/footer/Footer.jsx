import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {

const links = [
    { label: "Link1", href: "#" },
    { label: "Link2", href: "#" },
    { label: "Link3", href: "#" },
    { label: "Link4", href: "#" },
    { label: "Text5", href: null }, // просто текст
    { label: "Link6", href: "#" },
  ];

  return (
    <Box
      component="footer"
      mt={4}
      py={4}
      bgcolor="background.paper"
      display="flex"
      flexDirection="column"
      alignItems="center"
    ></Box>