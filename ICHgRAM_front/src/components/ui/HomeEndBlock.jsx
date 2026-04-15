import { Box, Typography } from "@mui/material";
import EndIcon from "../../assets/logo/endIconHome.svg";

const HomeEndBlock = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "404px",
        height: "auto",
        minHeight: "216px",
        ml: { xs: 0, md: "245px", lg: "223px" },
        mt: { xs: "80px", md: "40px", lg: "80px" },
        mb: { xs: "40px", lg: "40px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <img
        src={EndIcon}
        alt="End"
        style={{
          width: { xs: "60px", md: "83px" },
          height: { xs: "60px", md: "83px" },
        }}
      />
      <Typography variant="h5" sx={{ textAlign: "center", mt: "11px" }}>
        You've seen all the updates
      </Typography>
      <Typography
        variant="h10"
        sx={{ textAlign: "center", color: "text.secondary", mt: "4px" }}
      >
        You have viewed all new publications
      </Typography>
    </Box>
  );
};

export default HomeEndBlock;
