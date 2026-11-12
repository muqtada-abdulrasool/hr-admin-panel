import React from "react";
import styles from "./capsule.module.css";
import { Typography } from "@mui/material";

interface CapsuleProps {
  color:
    | "niceBlue"
    | "niceRed"
    | "success-main"
    | "warning-main"
    | "primary-main"
    | "error-main"
    | string;
  text: string;
}

export default function Capsule({ color, text }: CapsuleProps) {
  let bgColor = "var(--mui-palette-primary-main, #f89c1c)";
  if (color === "niceBlue" || color === "info") {
    bgColor = "var(--mui-palette-niceBlue, #0C8CE9)";
  } else if (color === "niceRed" || color === "error-main" || color === "error") {
    bgColor = "var(--mui-palette-niceRed, #B83B40)";
  } else if (color === "success-main" || color === "success") {
    bgColor = "#2e7d32";
  } else if (color === "warning-main" || color === "warning") {
    bgColor = "#ed6c02";
  } else if (color.startsWith("var(")) {
    bgColor = color;
  }

  return (
    <div
      className={styles.capsule}
      style={{ backgroundColor: bgColor }}
    >
      <Typography variant="subtitle1" color="white" sx={{ fontSize: "0.85rem", fontWeight: 600 }}>
        {text}
      </Typography>
    </div>
  );
}
