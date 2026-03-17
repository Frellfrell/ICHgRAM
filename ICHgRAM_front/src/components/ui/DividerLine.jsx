import { Box } from "@mui/material";

const DividerLine = () => {
  return (
    <Box
      sx={{
        height: "1px",
        backgroundColor: theme.palette.borders,
        width: "100%",
        ...sx,
      }}
    />
  );
};

export default DividerLine;
