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
    >
      {/* Верхняя часть футера: ссылки */}
      <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap">
        {links.map((link, index) =>
          link.href ? (
            <Link
              key={index}
              href={link.href}
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
