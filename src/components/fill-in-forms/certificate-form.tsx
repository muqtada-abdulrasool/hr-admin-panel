import * as React from "react";
import styles from "./form.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AttachmentBox from "../attachment-box/attachment-box";

interface FillInProps {
  state: boolean;
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  handleClose: () => void;
  handleConfirm: () => void;
}

export default function CertificateForm({
  state = true,
  handleClose = Function,
  handleConfirm = Function,
}: FillInProps) {
  return (
    <Dialog open={state} maxWidth="md" fullWidth>
      <DialogTitle>Certificate Form</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <form className={styles.scroll_container}>
          <div className={styles.vertical}>
            <div className={styles.horizontal}>
              <AttachmentBox />

              <div className={styles.vertical}>
                <div className={styles.horizontal}>
                  <TextField label="Name" fullWidth variant="filled" required />
                </div>
                <div className={styles.horizontal}>
                  <TextField
                    label="الاسم"
                    fullWidth
                    variant="filled"
                    sx={{ direction: "rtl" }}
                    required
                  />
                </div>
              </div>
            </div>
            <div className={styles.horizontal}>
              <TextField
                label="Description"
                fullWidth
                variant="filled"
                required
                multiline
              />
              <TextField
                label="وصف"
                fullWidth
                variant="filled"
                required
                multiline
              />
            </div>
            <div className={styles.horizontal}>
              <TextField
                label="Skills Involved (Separate by Comma)"
                fullWidth
                variant="filled"
              />
              <TextField
                label="Points to Skills (Separate by Comma)"
                fullWidth
                variant="filled"
              />
            </div>
            <div className={styles.horizontal}>
              <TextField
                label="المهارات المطلوبة (مفصولة بفاصلة)"
                fullWidth
                variant="filled"
              />
              <TextField
                label="نقاط المهارات (مفصولة بفاصلة)"
                fullWidth
                variant="filled"
              />
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" onClick={handleConfirm}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
