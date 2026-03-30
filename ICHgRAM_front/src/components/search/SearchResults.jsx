import React from "react";
import { Box, Typography } from "@mui/material";
import AppAvatar from "../ui/AppAvatar";

const SearchResults = ({ results, onUserClick }) => {
  const BE_URL = "http://localhost:5000";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {results?.map((user) => (
        <Box
          key={user._id}
          onClick={() => onUserClick(user._id)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            height: 56,
            mb: 1,
            cursor: "pointer",
            "&:hover": { opacity: 0.7 },
            borderBottom: "1px solid rgba(219,219,219,1)",
          }}
        >
          <AppAvatar
            src={
              user.avatar?.startsWith("data")
                ? user.avatar
                : `${BE_URL}${user.avatar}`
            }
          />

          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
              {user.username}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "14px" }}>
              {user.fullName}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SearchResults;
