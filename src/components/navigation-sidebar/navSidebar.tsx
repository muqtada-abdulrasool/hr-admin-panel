"use client";

import styles from "./navSidebar.module.css";
import { BottomPanel, ShrunkenBottomPanel } from "./navBottomPanel";
import FancyHR from "../fancy-hr/fancy-hr";

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
import BackArrow from "@mui/icons-material/ArrowBack";

interface SidebarProps {
  index?: number;
  popup?: boolean;
  callback?: Function;
}

const Sidebar: React.FC<SidebarProps> = ({ index = 0, popup, callback }) => {
  const [selectedIndex, setSelectedIndex] = useState(index);
  const [Locked, setLocked] = useState(true);
  const [popupable, setPopable] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (popup) {
      setLocked(true);
    }
  }, [popup]);

  useEffect(() => {
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
  }, []);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <div style={{ height: "100%" }}>
      <div
        className={`${styles.navSidebar_container} ${
          Locked ? styles.locked : ""
        } ${popup ? styles.popup : ""}`}
        id="navSidebar"
        style={Locked ? { width: "24rem" } : { width: "" }}
      >
        <div className={styles.navLogoContainer}>
          <img
            src={process.env.NEXT_PUBLIC_LOGO}
            className={styles.navLogo}
          ></img>
          <FancyHR></FancyHR>
        </div>
        <nav aria-label="main mailbox folders" style={{ width: "100%" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 0}
                href={
                  process.env.NEXT_PUBLIC_SECURITY_STANDARD! +
                  process.env.NEXT_PUBLIC_DOMAIN! +
                  "/"
                }
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <BarChart />
                </ListItemIcon>
                <ListItemText
                  primary={t("navbar.item1")}
                  sx={{ textAlign: "start" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 1}
                href={
                  process.env.NEXT_PUBLIC_SECURITY_STANDARD! +
                  process.env.NEXT_PUBLIC_DOMAIN! +
                  "/requests"
                }
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText primary={t("navbar.item2")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 2}
                href={
                  process.env.NEXT_PUBLIC_SECURITY_STANDARD! +
                  process.env.NEXT_PUBLIC_DOMAIN! +
                  "/employees"
                }
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primary={t("navbar.item3")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 3}
                href={
                  process.env.NEXT_PUBLIC_SECURITY_STANDARD! +
                  process.env.NEXT_PUBLIC_DOMAIN! +
                  "/certificates"
                }
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemIcon>
                  <Certificates />
                </ListItemIcon>
                <ListItemText primary={t("navbar.item4")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 4}
                href={
                  process.env.NEXT_PUBLIC_SECURITY_STANDARD! +
                  process.env.NEXT_PUBLIC_DOMAIN! +
                  "/roadmaps"
                }
                onClick={(event) => handleListItemClick(event, 4)}
              >
                <ListItemIcon>
                  <Roadmaps />
                </ListItemIcon>
                <ListItemText primary={t("navbar.item5")} />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <div style={{ width: "100%", height: "100%" }}></div>
        <FancyHR></FancyHR>
        <div className={styles.nav_bottom_panel}>
          <div className={styles.combined_buttons}>
            <Fab className={styles.power_button} size="small">
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
