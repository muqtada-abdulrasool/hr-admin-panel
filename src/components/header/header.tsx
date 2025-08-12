"use client";

import React, { useEffect } from "react";
import styles from "./header.module.css";

import { Fab, Typography } from "@mui/material";
import Hamburger from "@mui/icons-material/Menu";

import UserPFP from "../user-pfp/user-pfp";
import LangButton from "@/components/lang-button/lang-button";
import ThemeButton from "@/components/theme-button/theme-button";
import StylishClock from "@/components//clock/clock";

interface HeaderProps {
  Title?: string;
  HamburgerFunction?: Function;
}

const Header: React.FC<HeaderProps> = ({
  Title = "Header",
  HamburgerFunction,
}) => {
  return (
    <div className={styles.header_container}>
      <div className={styles.left_side_pc}>
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
      <div className={styles.left_side_mobile}>
        <Fab
          size="small"
          onClick={() => {
            if (HamburgerFunction) {
              HamburgerFunction();
            }
          }}
          sx={{
            backgroundColor: "transparent",
            borderRadius: "5px",
            boxShadow: "none",
          }}
        >
          <Hamburger />
        </Fab>
      </div>
      <div className={styles.middle_container}>
        <StylishClock></StylishClock>
      </div>

      <div className={styles.right_side}>
        <LangButton></LangButton>
        <ThemeButton></ThemeButton>
      </div>
    </div>
  );
};

export default Header;
