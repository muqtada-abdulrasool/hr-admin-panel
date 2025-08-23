import * as React from "react";
import styles from "./form.module.css";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import AttachmentBox from "../attachment-box/attachment-box";
import { exampleCertifications } from "@/utils/example-data";

interface FillInProps {
  state: boolean;
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  handleClose: () => void;
  handleConfirm: () => void;
}

export default function RoadmapForm({
  state = true,
  handleClose = Function,
  handleConfirm = Function,
}: FillInProps) {
  const [stepCount, setStepCount] = React.useState(0);
  const steps = [];

  for (let i = 0; i < stepCount; i++) {
    steps.push(
      <Autocomplete
        multiple
        options={exampleCertifications}
        getOptionLabel={(option) => option.title}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      />
    );
  }

  return (
    <Dialog open={state} maxWidth="md" fullWidth>
      <DialogTitle>Roadmap Form</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <form className={styles.scroll_container}>
          <div className={styles.vertical}>
            <div className={styles.horizontal}>
              <TextField label="Name" fullWidth variant="filled" required />
              <TextField
                label="الاسم"
                fullWidth
                variant="filled"
                sx={{ direction: "rtl" }}
                required
              />
            </div>
            <div
              className={styles.horizontal}
              style={{ alignItems: "flex-start" }}
            >
              <TextField
                label="Certificates Required (Steps)"
                fullWidth
                type="number"
                onChange={(event) => {
                  setStepCount(+event.target.value);
                }}
                variant="filled"
              />
              <div className={styles.vertical}>{steps}</div>
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
