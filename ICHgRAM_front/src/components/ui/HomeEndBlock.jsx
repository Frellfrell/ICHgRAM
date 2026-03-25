import { Box, Typography } from "@mui/material";
import EndIcon from "../../assets/logo/endIconHome.svg";

const HomeEndBlock = () => {
  return (
    <Box
      sx={{
        width: "404px",
        height: "216px",
        mx: "auto",
        mt: "80px", // Отступ от постов
        mb: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        //borderTop: "1px solid #DBDBDB",
        py: 4,
      }}
    >
      <img src={EndIcon} alt="End" style={{ width: "83px" }} />
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
