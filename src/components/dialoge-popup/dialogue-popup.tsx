import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface DialogueProps {
  state: boolean;
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  header: string;
  body: string;
  handleClose: () => void;
  handleConfirm: () => void;
}

export function ConfirmPopup({
  state = false,
  color = "info",
  header,
  body,
  handleClose = Function,
  handleConfirm = Function,
}: DialogueProps) {
  const [open, setOpen] = React.useState(state);

  return (
    <Dialog open={state}>
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        <DialogContentText>{body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color={"secondary"}
          variant="contained"
          sx={{ color: "var(--mui-palette-primary-contrastText)" }}
        >
          CANCEL
        </Button>
        <Button
          onClick={handleConfirm}
          color={color}
          variant="contained"
          sx={{ color: "var(--mui-palette-primary-contrastText)" }}
          autoFocus
        >
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
}
