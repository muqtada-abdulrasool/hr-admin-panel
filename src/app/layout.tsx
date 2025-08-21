"use client";

import "@/globals.css";
import React, { useEffect } from "react";
import styles from "./home.module.css";
import { lightTheme, darkTheme } from "@/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeContextProvider } from "@/utils/theme-context";
import { AuthProvider } from "@/auth/auth-context";
import { I18nextProvider } from "react-i18next";
import DirectionProvider from "@/utils/direction-provider";
import i18n from "@/utils/i18n";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.getItem("language");
  }
  return (
    <html lang="en" dir={"ltr"}>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={styles.root_container}>
        <I18nextProvider i18n={i18n}>
          <DirectionProvider>
            <AppRouterCacheProvider>
              <AuthProvider>
                <ThemeContextProvider>{children}</ThemeContextProvider>
              </AuthProvider>
            </AppRouterCacheProvider>
          </DirectionProvider>
        </I18nextProvider>
      </body>
    </html>
  );
}
