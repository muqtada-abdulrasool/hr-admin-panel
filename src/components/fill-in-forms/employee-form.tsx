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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface FillInProps {
  state: boolean;
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  handleClose: () => void;
  handleConfirm: () => void;
}

export default function EmployeeForm({
  state = true,
  handleClose = Function,
  handleConfirm = Function,
}: FillInProps) {
  return (
    <Dialog open={state} maxWidth="md" fullWidth>
      <DialogTitle>Employee Form</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <form id="subscription-form" className={styles.scroll_container}>
          <div className={styles.vertical}>
            <div className={styles.horizontal}>
              <AttachmentBox />

              <div className={styles.vertical}>
                <div className={styles.horizontal}>
                  <TextField
                    label="First Name"
                    fullWidth
                    variant="filled"
                    required
                  />
                  <TextField
                    label="Second Name"
                    fullWidth
                    variant="filled"
                    required
                  />
                  <TextField
                    label="Last Name"
                    fullWidth
                    variant="filled"
                    required
                  />
                </div>
                <div className={styles.horizontal}>
                  <TextField
                    label="الاسم الأول"
                    fullWidth
                    variant="filled"
                    sx={{ direction: "rtl" }}
                    required
                  />
                  <TextField
                    label="الاسم الثاني"
                    fullWidth
                    variant="filled"
                    sx={{ direction: "rtl" }}
                    required
                  />
                  <TextField
                    label="اسم العائلة"
                    fullWidth
                    variant="filled"
                    sx={{ direction: "rtl" }}
                    required
                  />
                </div>
              </div>
            </div>
            <div className={styles.horizontal}>
              <TextField label="Email" fullWidth variant="filled" required />
              <TextField
                label="Phone Number"
                fullWidth
                variant="filled"
                required
              />
            </div>
            <TextField label="CV" fullWidth variant="filled" />
            <div className={styles.horizontal}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Date of Employment" sx={{ width: "33%" }} />
              </LocalizationProvider>
              <FormControl size="medium" sx={{ width: "33%" }}>
                <InputLabel>Position</InputLabel>
                <Select value={"all"} label="Position" autoWidth>
                  <MenuItem value="all">Front-End Developer</MenuItem>
                  <MenuItem value="pen">Back-End Developer</MenuItem>
                  <MenuItem value="dec">HR</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Education"
                fullWidth
                variant="filled"
                sx={{ width: "33%" }}
              />
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          form="subscription-form"
          onClick={handleConfirm}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
