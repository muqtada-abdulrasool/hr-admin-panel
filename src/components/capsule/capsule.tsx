import React from "react";
import styles from "./capsule.module.css";
import { Typography } from "@mui/material";

interface CapsuleProps {
  color: "niceBlue" | "niceRed" | "success-main";
  text: string;
}

export default function Capsule({ color, text }: CapsuleProps) {
  return (
    <div
      className={styles.capsule}
      style={{ backgroundColor: "var(--mui-palette-" + color + ")" }}
    >
      <Typography variant="subtitle1" color="white">
        {text}
      </Typography>
    </div>
  );
}
