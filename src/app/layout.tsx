"use client";

import React from "react";
import "@/globals.css";
import styles from "./home.module.css";
import theme from "@/theme";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "@/utils/auth-context";
import { I18nextProvider } from "react-i18next";
import DirectionProvider from "@/utils/direction-provider";
import i18n from "@/utils/i18n";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={styles.root_container}>
        <AppRouterCacheProvider>
          <AuthProvider>
            <I18nextProvider i18n={i18n}>
              <DirectionProvider>
                <ThemeProvider
                  theme={theme}
                  noSsr
                  i18nIsDynamicList
                  defaultMode="light"
                >
                  {children}
                </ThemeProvider>
              </DirectionProvider>
            </I18nextProvider>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
