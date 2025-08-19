"use client";

import Cookies from "js-cookie";
import generateUUID from "@/utils/uuid";

import Input from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FancyHR from "../../components/fancy-hr/fancy-hr";
import styles from "./login.module.css";

import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Checkpassword } from "@/utils/password-checker";
import { Alert } from "@mui/material";
import getAsset from "@/utils/asset-retriever";

interface RequestBody {
  email: string;
  password: string;
  deviceID: string;
}

export default function Login() {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);
  const [passErrorText, setPassErrorText] = useState([""]);
  const [deviceID, setDeviceID] = React.useState("");
  const { t } = useTranslation();

  // React.useEffect(() => {
  //   setDeviceID(getOrSetDeviceIdentifier());
  // }, []);

  // function getOrSetDeviceIdentifier() {
  //   let tmpDeviceIdentifier = Cookies.get("deviceIdentifier");
  //   let deviceIdentifier: string;

  //   if (typeof tmpDeviceIdentifier !== undefined) {
  //     deviceIdentifier = tmpDeviceIdentifier!;
  //   } else {
  //     deviceIdentifier = generateUUID();
  //     Cookies.set("deviceIdentifier", deviceIdentifier, {
  //       expires: 365,
  //       sameSite: "strict",
  //     });
  //   }

  //   return deviceIdentifier;
  // }

  async function fetchDataFromSwaggerAPI(name: string, pass: string) {
    console.log("meow");
    try {
      const Data: RequestBody = {
        email: name,
        password: pass,
        deviceID: deviceID,
      };

      const testData: RequestBody = {
        email: "thedarksoul622@gmail.com",
        password: "$TR!NG12345",
        deviceID: "string",
      };

      let response = await fetch(
        "http://" + process.env.NEXT_PUBLIC_PUBLIC_API_URL + "/api/Auth",
        {
          method: "POST",
          body: JSON.stringify(testData),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const JSONBody = await response.json();
        Cookies.set("userID", JSONBody.data.userID, {});
        Cookies.set("refreshToken", JSONBody.data.refreshToken, {});
      }
    } catch (e) {
      console.log(e);
    }
  }

  function updatePassword(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const PassVal = Checkpassword(event.target.value);
    if (PassVal.Validity) {
      setPassword(event.target.value);
      setPassError(false);
    } else {
      setPassError(true);
      setPassErrorText(PassVal.Errors);
    }
  }

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchDataFromSwaggerAPI(accountName, password);
  };
  return (
    <div className={styles.login_page_container}>
      <div className={styles.login_content_container}>
        <div className={styles.login_subcontent_container}>
          <div>
            <Typography variant="h2">{t("login.loginh1")}</Typography>
            <Typography variant="h4">
              {t("login.loginh2start")}
              <span style={{ color: "var(--primary-color)" }}>
                {t("login.loginh2middle")}
              </span>
              {t("login.loginh2end")}
            </Typography>
          </div>

          <FancyHR />

          <form
            className={styles.login_subcontent_container}
            onSubmit={formSubmit}
          >
            <Input
              label={t("login.logininputlabel1")}
              variant="outlined"
              required
              onChange={(e) => setAccountName(e.target.value)}
            ></Input>
            <Input
              label={t("login.logininputlabel2")}
              type="password"
              variant="outlined"
              onChange={(e) => updatePassword(e)}
              required
            ></Input>
            {passError ? (
              <Alert severity="error">
                {passErrorText.map((item, index) => (
                  // Add a line break after each item except the last one
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
              disabled={passError}
              sx={{ height: "3.5rem", fontSize: "2rem", fontWeight: "800" }}
            >
              {t("login.loginbuttonlabel")}
            </Button>
          </form>
        </div>

        <div className={styles.login_divider_container}></div>

        <div className={styles.login_logo_container}>
          <img src={getAsset("logo")} alt="" className={styles.login_logo} />
        </div>
      </div>
    </div>
  );
}
