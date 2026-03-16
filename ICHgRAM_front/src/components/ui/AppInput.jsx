import { TextField } from "@mui/material";

const AppInput = (props) => {
  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      sx={{
        mb: 1.5,
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#fafafa",
          fontSize: "12px",
          "& fieldset": {
            borderColor: "#dbdbdb",
          },
        },
      }}
      {...props}
    />
  );
};

export default AppInput;
