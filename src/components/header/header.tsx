"use client";

import React, { useEffect } from "react";
import styles from "./header.module.css";

import { Typography } from "@mui/material";

import UserPFP from "../user-pfp/user-pfp";
import LangButton from "@/components/lang-button/lang-button";
import ThemeButton from "@/components/theme-button/theme-button";
import StylishClock from "@/components//clock/clock";

interface HeaderProps {
  Title: string;
}

const Header: React.FC<HeaderProps> = ({ Title }) => {
  return (
    <div className={styles.header_container}>
      <div className={styles.right_side}>
        <UserPFP size="4rem" image="/images/User.png"></UserPFP>
        <Typography
          variant="h3"
          sx={{
            "@media (max-width: 450px)": {
              fontSize: "1.2rem",
            },
          }}
        >
          {Title}
        </Typography>
      </div>
      <StylishClock></StylishClock>

      <div className={styles.left_side}>
        <LangButton></LangButton>
        <ThemeButton></ThemeButton>
      </div>
    </div>
  );
};

export default Header;
