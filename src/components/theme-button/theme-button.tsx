"use client";

import React from "react";

import Day from "@mui/icons-material/Sunny";
import Night from "@mui/icons-material/Bedtime";
import { IconButton } from "@mui/material";
import theme from "@/theme";

const ThemeButton = () => {
  const [theme, setTheme] = React.useState(false);

  function handleThemeChange() {
    setTheme(!theme);
  }

  return (
    <IconButton
      aria-label="fingerprint"
      color="primary"
      size="large"
      onClick={handleThemeChange}
    >
      {theme ? <Night /> : <Day />}
    </IconButton>
  );
};

export default ThemeButton;
