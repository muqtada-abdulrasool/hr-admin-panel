"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Ensure default language is "en" when localStorage is empty or contains an invalid value
if (typeof window !== "undefined" && window.localStorage) {
  const storedLang = localStorage.getItem("language");
  if (!storedLang || !["en", "ar", "jp"].includes(storedLang)) {
    localStorage.setItem("language", "en");
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: require("/public/dictionaries/en.json"),
      },
      ar: {
        translation: require("/public/dictionaries/ar.json"),
      },
      jp: {
        translation: require("/public/dictionaries/jp.json"),
      },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "ar", "jp"],
    load: "languageOnly",
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "language",
      caches: ["localStorage"],
    },
  });

export default i18n;
