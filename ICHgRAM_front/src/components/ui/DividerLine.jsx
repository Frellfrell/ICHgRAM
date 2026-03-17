import { Box } from "@mui/material";

const DividerLine = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        my: "20px",
        width: "100%",
        px: "40px", // Чтобы линия не прилипала к краям формы 350px
      }}
    >
      <Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} />

      <Typography
        sx={{
          px: 2,
          color: "text.secondary",
          fontSize: "13px",
          fontWeight: 600,
        }}
      >
        OR
      </Typography>

      <Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} />
    </Box>
  );
};

export default DividerLine;
