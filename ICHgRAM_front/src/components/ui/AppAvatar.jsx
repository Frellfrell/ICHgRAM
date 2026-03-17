import { Avatar } from "@mui/material";

const AppAvatar = ({ src, alt, size = 40, sx }) => {
  return (
    <Avatar
      src={src}
      alt={alt}
      sx={{
        width: size,
        height: size,
        border: "1px solid",
        borderColor: "divider",
        ...sx,
      }}
    />
  );
};

export default AppAvatar;
