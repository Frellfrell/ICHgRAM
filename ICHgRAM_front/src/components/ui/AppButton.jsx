import { Button } from "@mui/material";

const AppButton = ({ children, variant = "contained", ...props }) => {
  return (
    <Button variant={variant} {...props}>
      {children}
    </Button>
  );
};

export default AppButton;
