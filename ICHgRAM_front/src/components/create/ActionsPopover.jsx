import { Popover, Box, Button, Divider } from "@mui/material";

const ActionsPopover = ({ anchorEl, onClose, onDelete, onEditSubmit }) => {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box sx={{ width: "400px" }}>
        <Button
          onClick={onDelete}
          sx={{
            height: "48px",
            width: "100%",
            color: "#ED4956",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "14px",
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.05)" },
          }}
        >
          Delete
        </Button>
        <Divider sx={{ borderColor: "rgba(219, 219, 219, 1)" }} />

        <Button
          onClick={() => {
            console.log("EDIT BUTTON CLICK");
            console.log("onEdit type in ActionsPopover:", typeof onEdit);
            onClose();
            if (onEditSubmit) {
              onEditSubmit();
            }
          }}
          sx={{
            height: "48px",
            width: "100%",
            color: "#262626",
            fontWeight: 400,
            textTransform: "none",
            fontSize: "14px",
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.05)" },
          }}
        >
          Edit
        </Button>
        <Divider sx={{ borderColor: "rgba(219, 219, 219, 1)" }} />

        <Button
          onClick={onClose}
          sx={{
            height: "48px",
            width: "100%",
            color: "#262626",
            textTransform: "none",
            fontSize: "14px",
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.05)" },
          }}
        >
          Go to post
        </Button>
        <Divider sx={{ borderColor: "rgba(219, 219, 219, 1)" }} />

        <Button
          onClick={onClose}
          sx={{
            height: "48px",
            width: "100%",
            color: "#262626",
            textTransform: "none",
            fontSize: "14px",
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.05)" },
          }}
        >
          Copy link
        </Button>
        <Divider sx={{ borderColor: "rgba(219, 219, 219, 1)" }} />

        <Button
          onClick={onClose}
          sx={{
            height: "48px",
            width: "100%",
            color: "#262626",
            textTransform: "none",
            fontSize: "14px",
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.05)" },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Popover>
  );
};

export default ActionsPopover;
