"use client";

import Input from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FancyHR from "../../components/fancy-hr/fancy-hr";
import styles from "./login.module.css";

import React, { useState } from "react";
import { Typography, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Checkpassword } from "@/utils/password-checker";
import { Alert } from "@mui/material";
import getAsset from "@/utils/asset-retriever";
import { login } from "@/auth/devices/login-device";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/auth/auth-context";

export default function Login() {
  const router = useRouter();
  const auth = useAuthContext();
  const isOffline =
    process.env.NEXT_PUBLIC_OFFLINE_MODE === "true" ||
    process.env.NEXT_PUBLIC_DISABLE_AUTH === "true";

  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);
  const [passErrorText, setPassErrorText] = useState<string[]>([]);
  const [deviceID] = React.useState("browser-client");
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();

  function updatePassword(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const val = event.target.value;
    setPassword(val);
    if (!val && isOffline) {
      setPassError(false);
      setPassErrorText([]);
      return;
    }
    const PassVal = Checkpassword(val);
    if (PassVal.Validity) {
      setPassError(false);
      setPassErrorText([]);
    } else {
      if (!isOffline) {
        setPassError(true);
        setPassErrorText(PassVal.Errors);
      } else {
        setPassError(false);
        setPassErrorText([]);
      }
    }
  }

  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailToUse =
      accountName.trim() ||
      process.env.NEXT_PUBLIC_TEST_EMAIL ||
      "admin@company.com";
    const passwordToUse =
      password ||
      process.env.NEXT_PUBLIC_TEST_PASSWORD ||
      "P@ssword12345";

    const result = await login(
      emailToUse,
      passwordToUse,
      deviceID,
      setLoading
    );

    if (result && result.statusCode === 200) {
      if (auth?.fetchNewJwt) {
        await auth.fetchNewJwt();
      }
      router.push("/");
    } else {
      setPassError(true);
      setPassErrorText([
        result?.errorMessage || "Login failed. Please check credentials or turn on offline mode.",
      ]);
    }
  };

  const handleSkipLogin = () => {
    if (auth?.fetchNewJwt) {
      auth.fetchNewJwt();
    }
    router.push("/");
  };

  return (
    <div className={styles.login_page_container}>
      <div className={styles.login_content_container}>
        <div className={styles.login_subcontent_container}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Typography variant="h2">{t("login.loginh1")}</Typography>
              {isOffline && (
                <Chip
                  label="Offline Mode Active (MSW)"
                  color="success"
                  size="small"
                  variant="outlined"
                />
              )}
            </div>
            <Typography variant="h4">
              {t("login.loginh2start")}
              <span style={{ color: "var(--primary-color)" }}>
                {t("login.loginh2middle")}
              </span>
              {t("login.loginh2end")}
            </Typography>
          </div>

          <FancyHR />

          {isOffline && (
            <Alert severity="info" sx={{ width: "100%" }}>
              Offline mode is active. You can sign in immediately without typing your email or password.
            </Alert>
          )}

          <form
            className={styles.login_subcontent_container}
            onSubmit={formSubmit}
          >
            <Input
              label={t("login.logininputlabel1")}
              variant="outlined"
              value={accountName}
              placeholder={isOffline ? "admin@company.com (optional)" : ""}
              onChange={(e) => setAccountName(e.target.value)}
              fullWidth
            />
            <Input
              label={t("login.logininputlabel2")}
              type="password"
              variant="outlined"
              value={password}
              placeholder={isOffline ? "Optional in offline mode" : ""}
              onChange={(e) => updatePassword(e)}
              fullWidth
            />
            {passError ? (
              <Alert severity="error">
                {passErrorText.map((item, index) => (
                  <span key={index}>
                    {item}
                    {index < passErrorText.length - 1 && <br />}
                  </span>
                ))}
              </Alert>
            ) : null}

            <FancyHR />
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              loading={loading}
              disabled={!isOffline && passError}
              sx={{ height: "3.5rem", fontSize: "1.6rem", fontWeight: "800" }}
            >
              {t("login.loginbuttonlabel")}
            </Button>

            {isOffline && (
              <Button
                variant="outlined"
                color="secondary"
                size="medium"
                onClick={handleSkipLogin}
                sx={{ mt: 1 }}
              >
                Skip Login & Enter Dashboard →
              </Button>
            )}
          </form>
        </div>

        <div className={styles.login_divider_container}></div>

        <div className={styles.login_logo_container}>
          <img src={getAsset("logo")} alt="Logo" className={styles.login_logo} />
        </div>
      </div>
    </div>
  );
}
