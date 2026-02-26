import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const DividerLine = ({ sx }) => {
  const theme = useTheme();

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
