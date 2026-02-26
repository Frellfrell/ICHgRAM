import { Typography } from "@mui/material";

const AppTypography = ({ variant = "body1", children, ...props }) => {
  return (
    <Typography variant={variant} {...props}>
      {children}
    </Typography>
  );
};

export default AppTypography;
