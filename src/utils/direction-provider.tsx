"use client";

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function DirectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n } = useTranslation();

  const currentLang =
    i18n.language && ["en", "ar", "jp"].includes(i18n.language)
      ? i18n.language
      : "en";

  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      currentLang === "ar" ? "rtl" : "ltr"
    );
    document.documentElement.setAttribute("lang", currentLang);
  }, [currentLang]);

  return <>{children}</>;
}
