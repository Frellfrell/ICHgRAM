import { Typography } from "@mui/material";

const AppTypography = ({ variant = "body1", children, color, sx }) => {
  return (
    <Typography variant={variant} sx={{ color: color, ...sx }}>
      {children}
    </Typography>
  );
};

export default AppTypography;
