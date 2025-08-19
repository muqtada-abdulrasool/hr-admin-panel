"use client";

import React, { useEffect } from "react";

import Day from "@mui/icons-material/Sunny";
import Night from "@mui/icons-material/Bedtime";
import { IconButton } from "@mui/material";
import { useThemeContext } from "@/utils/theme-context";

const ThemeButton = () => {
  const [theme, setTheme] = React.useState(false);
  let ThemeContext = useThemeContext();

  useEffect(() => {
    if (ThemeContext.theme == "light") {
      setTheme(false);
    } else {
      setTheme(true);
    }
  }, [ThemeContext.theme]);

  function handleThemeChange() {
    setTheme(!theme);
    if (ThemeContext.theme == "light") {
      ThemeContext.changeTheme("dark");
    } else {
      ThemeContext.changeTheme("light");
    }
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
