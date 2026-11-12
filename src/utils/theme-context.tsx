import React, { useEffect } from "react";

import { lightTheme, darkTheme } from "@/theme";
import { ThemeProvider } from "@mui/material";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextType {
  theme: "light" | "dark";
  changeTheme: Function;
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: "dark",
  changeTheme: () => {},
});

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");

  useEffect(() => {
    let localTheme: string | null = null;
    if (typeof window !== "undefined" && window.localStorage) {
      localTheme = localStorage.getItem("theme");
    }
    if (localTheme === "light" || localTheme === "dark") {
      setTheme(localTheme);
    } else {
      setTheme("dark"); // default dark mode when empty
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("theme", "dark");
      }
    }
  }, []);

  function changeTheme(t: "light" | "dark") {
    setTheme(t);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("theme", t);
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <ThemeProvider
        theme={theme === "light" ? lightTheme : darkTheme}
        i18nIsDynamicList
        noSsr
      >
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => React.useContext(ThemeContext);
