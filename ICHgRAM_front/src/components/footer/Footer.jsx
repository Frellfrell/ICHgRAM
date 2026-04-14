import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Link } from "@mui/material";

const Footer = ({ onCreateClick }) => {
  const links = [
    { label: "Home", type: "link", path: "/home" },
    { label: "Explore", type: "link", path: "/explore" },
    { label: "Message", type: "link", path: "/messages" },
    { label: "Search", type: "action", path: "/search" },
    { label: "Notification", type: "text" },
    { label: "Create", type: "action", onClick: onCreateClick },
  ];

  return (
    <Box
      component="footer"
      sx={{
        height: "158px",
        mt: 4,
        py: 4,
        paddingRight: { xs: "80px", md: "155px" },
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Верхняя часть футера: ссылки */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          mb: "25px",
          flexWrap: "wrap",
        }}
      >
        {links.map((item, index) =>
          item.type === "link" ? (
            <Link
              key={index}
              component={RouterLink}
              to={item.path}
              underline="none"
              color="text.secondary"
            >
              {item.label}
            </Link>
          ) : item.type === "action" ? (
            <Typography
              key={index}
              onClick={() => {
                if (item.label === "Create") onCreateClick?.();
              }}
              sx={{ cursor: "pointer", color: "text.secondary" }}
            >
              {item.label}
            </Typography>
          ) : (
            <Typography key={index} color="text.secondary">
              {item.label}
            </Typography>
          ),
        )}
      </Box>

      {/* Нижняя часть футера: копирайт */}
      <Typography
        sx={{ fontSize: "12px", fontWeight: "400", color: "text.secondary" }}
      >
        © 2026 ICHgRAM
      </Typography>
    </Box>
  );
};

export default Footer;
