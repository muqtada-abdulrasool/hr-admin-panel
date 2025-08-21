import React from "react";
import styles from "./throbber.module.css";

import { CircularProgress } from "@mui/material";

export default function Throbber() {
  return (
    <div className={styles.throbber_container}>
      <CircularProgress></CircularProgress>
    </div>
  );
}
