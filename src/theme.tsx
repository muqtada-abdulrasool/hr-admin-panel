"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    foreground?: string;
    niceRed?: string;
    niceBlue?: string;
  }
  interface PaletteOptions {
    foreground?: string;
    niceRed?: string;
    niceBlue?: string;
  }
}

let theme = createTheme({});

theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
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
          light: "#F89C1C",
          dark: "#484848",
        },
        background: {
          default: "#f9f8f8",
        },

        foreground: "#ffffff",
        niceRed: "#B83B40",
        niceBlue: "#0C8CE9",
      },
    },
    // dark: {
    //   palette: {
    //     mode: "light",
    //     primary: {
    //       main: "#ffffff",
    //       light: "#ffffff",
    //       dark: "#ffffff",
    //       contrastText: "#ffffff",
    //     },
    //     secondary: {
    //       main: "#ffffff",
    //       light: "#ffffff",
    //       dark: "#ffffff",
    //     },
    //   },
    // },
  },
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
      fontSize: "4rem", // Use rem for responsive sizing
      fontWeight: 900,
    },
    h2: {
      fontSize: "3rem",
      fontWeight: 800,
    },
    h3: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    // You can also define other variants
    body1: {
      fontSize: "1rem",
    },
    button: {
      textTransform: "none", // A common customization
    },
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.MuiTableRow-hover:hover": {
            // background: "red",
            background: "var(--mui-palette-primary-light)",
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
          color: "var(--secondary-color)",
          ".Mui-selected &": {
            color: "var(--mui-palette-primary-contrastText  )",
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
          // color: "var(--text-color)",
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
          backgroundColor: "var(--foreground-color)",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
