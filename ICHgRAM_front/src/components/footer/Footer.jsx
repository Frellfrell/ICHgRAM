import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  const links = [
    { label: "Home", type: "link", path: "/home" },
    { label: "Explore", type: "link", path: "/explore" },
    { label: "Message", type: "link", path: "/message" },
    { label: "Search", type: "action", path: "/search" },
    { label: "Notification", type: "text" },
    { label: "Create", type: "action", path: "/create" },
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
    >
      {/* Верхняя часть футера: ссылки */}
      <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap">
        {links.map((link, index) =>
          link.href ? (
            <Link
              component={RouterLink}
              to={link.path}
              underline="none"
              color="text.secondary"
            >
              {link.label}
            </Link>
          ) : (
            <Typography key={index} color="text.secondary">
              {link.label}
            </Typography>
          ),
        )}
      </Box>

      {/* Нижняя часть футера: копирайт */}
      <Typography
        mt={2}
        fontSize={14}
        color="text.secondary"
        textAlign="center"
      >
        © 2026 Your Project Name. Все права защищены.
      </Typography>
    </Box>
  );
};

export default Footer;
