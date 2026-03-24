import { TextField } from "@mui/material";

const AppInput = ({
  placeholder,
  type,
  value,
  onChange,
  name,
  error,
  helperText,
  ...rest
}) => {
  return (
    <TextField
      fullWidth
      size="small"
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      {...rest}
      sx={{
        mb: "6px",
        "& .MuiOutlinedInput-root": {
          height: "38px",
          backgroundColor: "grey.50",
          fontSize: "12px",
        },
      }}
    />
  );
};

export default AppInput;
