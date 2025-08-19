"use client";

import { Widgets } from "@mui/icons-material";
import styles from "./user-pfp.module.css";

import React from "react";

interface UserPFPProps {
  size?: string;
  roundness?: string;
  lineThickness?: string;
  image?: string;
}

const UserPFP: React.FC<UserPFPProps> = ({
  roundness = "100%",
  lineThickness = "0.125rem",
  image = "images/User.png",
  size = "3.5rem",
}) => {
  return (
    <div
      className={styles.pfp_container}
      style={{
        borderRadius: roundness,
        border: "solid var(--mui-palette-secondary-main)" + " " + lineThickness,
        width: size,
        maxWidth: size,
      }}
    >
      <img className={styles.pfp} src={image}></img>
    </div>
  );
};

export default UserPFP;
