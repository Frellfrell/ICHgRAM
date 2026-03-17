import { Button } from "@mui/material";

const AppButton = ({ children, ...props }) => {
  return (
    <Button
      variant="contained"
      fullWidth
      disableElevation
      {...props}
      sx={{
        py: "6px",
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;
