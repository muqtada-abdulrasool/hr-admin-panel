"use client";

import styles from "./navSidebar.module.css";
import { useStore } from "@/utils/store";
import FancyHR from "../fancy-hr/fancy-hr";
import Cookie from "js-cookie";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Fab,
} from "@mui/material";

import BarChart from "@mui/icons-material/BarChart";
import Email from "@mui/icons-material/Email";
import People from "@mui/icons-material/PeopleAlt";
import Certificates from "@mui/icons-material/WorkspacePremium";
import Roadmaps from "@mui/icons-material/AddRoad";

import Power from "@mui/icons-material/PowerSettingsNew";
import Gear from "@mui/icons-material/Settings";
import Unlock from "@mui/icons-material/LockOpen";
import Lock from "@mui/icons-material/Lock";
import getAsset from "@/utils/asset-retriever";
import { ConfirmPopup } from "../dialoge-popup/dialogue-popup";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/auth/auth-context";

interface SidebarProps {
  index?: number;
  popup?: boolean;
  callback?: Function;
}

const Sidebar: React.FC<SidebarProps> = ({ index = 0, popup, callback }) => {
  const router = useRouter();
  const Locked = useStore((state) => state.lock);
  const setLocked = useStore((state) => state.setLock);

  const [selectedIndex, setSelectedIndex] = useState(index);
  const [popupable, setPopable] = useState(false);
  const { t } = useTranslation();
  const [hydrated, setHydrated] = useState(false);

  const [logout, setLogout] = React.useState(false);
  function logoutNow() {
    console.log("Logout");

    Cookie.remove("refreshToken");
    Cookie.remove("userID");

    if (window != undefined) {
      window.location.reload();
    }

    setLogout(false);
  }

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (popup) {
      setLocked(true);
    }
  }, [popup]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth < 800) {
          setLocked(true);
          setPopable(true);
        } else {
          setPopable(false);
        }
      };

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleListItemClick = (location: string, index: number) => {
    setSelectedIndex(index);
    router.push(location);
  };

  if (!hydrated) {
    return null;
  }

  return (
    <div style={{ height: "100%" }}>
      <ConfirmPopup
        state={logout}
        header="Loggin out?"
        body="You will be required to input your credintials when trying to enter this site once again."
        color="error"
        handleClose={() => setLogout(false)}
        handleConfirm={() => logoutNow()}
      ></ConfirmPopup>
      <div
        className={`${styles.navSidebar_container} ${
          Locked ? styles.locked : ""
        } ${popup ? styles.popup : ""}`}
        id="navSidebar"
        style={Locked ? { width: "24rem" } : { width: "" }}
      >
        <div className={styles.navLogoContainer}>
          <img src={getAsset("logo")} className={styles.navLogo}></img>
          <FancyHR></FancyHR>
        </div>
        <nav aria-label="main mailbox folders" style={{ width: "100%" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick("/", 0)}
              >
                <ListItemIcon>
                  <BarChart />
                </ListItemIcon>
                <ListItemText
                  primary={t("navbar.item1")}
                  sx={{ textAlign: "start", textWrap: "nowrap" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick("/requests", 1)}
              >
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText
                  primary={t("navbar.item2")}
                  sx={{ textAlign: "start", textWrap: "nowrap" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick("/employees", 2)}
              >
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText
                  primary={t("navbar.item3")}
                  sx={{ textAlign: "start", textWrap: "nowrap" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick("/certificates", 3)}
              >
                <ListItemIcon>
                  <Certificates />
                </ListItemIcon>
                <ListItemText
                  primary={t("navbar.item4")}
                  sx={{ textAlign: "start", textWrap: "nowrap" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick("/roadmaps", 4)}
              >
                <ListItemIcon>
                  <Roadmaps />
                </ListItemIcon>
                <ListItemText
                  primary={t("navbar.item5")}
                  sx={{ textAlign: "start", textWrap: "nowrap" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <div style={{ width: "100%", height: "100%" }}></div>
        <FancyHR></FancyHR>
        <div className={styles.nav_bottom_panel}>
          <div className={styles.combined_buttons}>
            <Fab
              className={styles.power_button}
              size="small"
              onClick={() => setLogout(true)}
            >
              <Power fontSize="medium" />
            </Fab>
            <Fab
              className={styles.settings_button}
              variant="extended"
              size="medium"
            >
              <Typography
                variant="subtitle1"
                className={styles.settings_text}
                sx={{
                  color: "var(--mui-palette-primary-contrastText)",
                }}
              >
                SETTINGS{" "}
              </Typography>
              <Gear fontSize="medium" />
            </Fab>
          </div>
          <Fab
            className={styles.lock_button}
            size="small"
            onClick={() => {
              setLocked(!Locked);
            }}
          >
            {Locked ? (
              <Lock fontSize="medium" />
            ) : (
              <Unlock fontSize="medium"></Unlock>
            )}
          </Fab>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
