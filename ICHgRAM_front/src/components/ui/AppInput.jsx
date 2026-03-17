import { TextField } from "@mui/material";

const AppInput = ({
  placeholder,
  type,
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <TextField
      fullWidth
      size="small"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      sx={{
        mb: "6px",
        "& .MuiOutlinedInput-root": {
          height: "38px",
          backgroundColor: "#fafafa",
          fontSize: "12px",
        },
      }}
    />
  );
};

export default AppInput;
