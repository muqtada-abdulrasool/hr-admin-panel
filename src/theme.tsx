"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import deepmerge from "@mui/utils/deepmerge";

declare module "@mui/material/styles" {
  interface Palette {
    foreground?: string;
    reverseText?: string;
    niceRed?: string;
    niceBlue?: string;
  }
  interface PaletteOptions {
    foreground?: string;
    reverseText?: string;
    niceRed?: string;
    niceBlue?: string;
  }
}
let baseTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: ["Tajawal", "Cairo"].join(","),
    h1: {
      color: "var(--mui-palette-text-primary)",
      fontSize: "4rem",
      fontWeight: 900,
    },
    h2: {
      color: "var(--mui-palette-text-primary)",

      fontSize: "3rem",
      fontWeight: 800,
    },
    h3: {
      color: "var(--mui-palette-text-primary)",

      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h4: {
      color: "var(--mui-palette-text-primary)",

      fontSize: "2rem",
      fontWeight: 600,
    },
    h5: {
      color: "var(--mui-palette-text-primary)",
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h6: {
      color: "var(--mui-palette-text-primary)",

      fontSize: "1.25rem",
      fontWeight: 500,
    },
    body1: {
      color: "var(--mui-palette-text-primary)",
      fontSize: "1rem",
    },
    subtitle1: {
      color: "var(--mui-palette-text-primary)",
    },
    subtitle2: {
      color: "var(--mui-palette-text-primary)",
    },
    button: {
      color: "var(--mui-palette-text-primary)",

      textTransform: "none", // A common customization
    },
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          outline: "1px solid var(--mui-palette-secondary-light)",
          background: "var(--mui-palette-foreground)",
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: "var(--mui-palette-text-primary)",
          "& .MuiTablePagination-selectLabel": {
            color: "var(--mui-palette-text-primary)",
          },
          "& .MuiTablePagination-displayedRows": {
            color: "var(--mui-palette-text-primary)",
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          zIndex: 0,
          color: "var(--mui-palette-text-primary)",
          "&.MuiFab-sizeSmall:hover": {
            //   color: "var(--mui-palette-text-primary)",
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
          overflow: "hidden",
          "&.Mui-selected": {
            backgroundColor: "var(--mui-palette-primary-main)",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "var(--mui-palette-primary-dark)",
          },
          ":hover": {
            backgroundColor: "var(--mui-palette-primary-light)",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "var(--mui-palette-text-primary)",
          ".Mui-selected &": {
            color: "var(--mui-palette-primary-contrastText)",
          },
        },
      },
    },
    MuiListItemText: {
      defaultProps: {
        primaryTypographyProps: {
          variant: "h5",
        },
      },
      styleOverrides: {
        primary: {
          color: "var(--mui-palette-text-primary)",
          textAlign: "start",
          ".Mui-selected &": {
            color: "var(--mui-palette-primary-contrastText)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--mui-palette-foreground)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--mui-palette-secondary-main)",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: "var(--mui-palette-text-primary)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--mui-palette-secondary-main)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--mui-palette-text-primary)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--mui-palette-primary-main)", // Focused color
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          background: "var(--mui-palette-foreground)",
          color: "var(--mui-palette-text-primary)",
          "&:hover": {
            backgroundColor: "var(--mui-palette-primary-light)",
          },
          "&.Mui-selected": {
            backgroundColor: "var(--mui-palette-primary-main)",
            color: "var(--mui-palette-primary-contrastText)",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "var(--mui-palette-primary-dark)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--mui-palette-foreground)",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          background: "var(--mui-palette-foreground)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(2px)",
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "var(--mui-palette-primary-main)",
        },
      },
    },
  },
});

let lightTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#f89c1c",
      light: "#f89c1c33",
      dark: "#f78c1b",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#676767",
      light: "rgba(103, 103, 103, 0.25)",
      dark: "#484848",
    },
    text: {
      primary: "rgb(0, 0, 0)",
      secondary: "rgb(0, 0, 0)",
    },
    background: {
      default: "#f9f8f8",
    },

    foreground: "#ffffff",
    niceRed: "#B83B40",
    niceBlue: "#0C8CE9",
  },
});

let darkTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: "#f89c1c",
      light: "#f89c1c33",
      dark: "#f78c1b",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#999999",
      light: "rgba(153, 153, 153, 0.25)",
      dark: "#707070",
    },
    text: {
      primary: "rgb(255, 255, 255)",
      secondary: "rgb(255, 255, 255)",
    },
    background: {
      default: "#676767",
    },
    error: {
      main: "#B83B40",
    },
    info: {
      main: "#0C8CE9",
    },
    reverseText: "#000000",
    foreground: "#4D4D4D",
    niceRed: "#B83B40",
    niceBlue: "#0C8CE9",
  },
});

lightTheme = deepmerge(lightTheme, baseTheme);
lightTheme = responsiveFontSizes(lightTheme);

darkTheme = deepmerge(darkTheme, baseTheme);
darkTheme = responsiveFontSizes(darkTheme);

export { lightTheme, darkTheme };
