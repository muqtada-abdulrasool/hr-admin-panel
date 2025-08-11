"use client";

import styles from "./navSidebar.module.css";
import { BottomPanel, ShrunkenBottomPanel } from "./navBottomPanel";
import FancyHR from "../fancy-hr/fancy-hr";

import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";

import BarChart from "@mui/icons-material/BarChart";
import Email from "@mui/icons-material/Email";
import People from "@mui/icons-material/PeopleAlt";
import Certificates from "@mui/icons-material/WorkspacePremium";
import Roadmaps from "@mui/icons-material/AddRoad";

interface SidebarProps {
  index?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ index = 0 }) => {
  const navBreakPoint = 800;
  const [selectedIndex, setSelectedIndex] = React.useState(index);
  const [Shrunken, setShrunken] = React.useState(false);
  const [Locked, setLocked] = React.useState(true);
  const { t } = useTranslation();

  React.useEffect(() => {
    const NavElemant = document.getElementById("navSidebar");
    if (NavElemant) {
      NavElemant.addEventListener("mouseenter", (event) => {
        if (window.innerWidth > navBreakPoint) {
          NavElemant.classList.add("expand");
          setShrunken(true);
        }
      });
      NavElemant.addEventListener("mouseleave", (event) => {
        NavElemant.classList.remove("expand");
        setShrunken(false);
      });

      if (typeof window !== undefined) {
        function handleResize() {
          if (window.innerWidth < navBreakPoint) {
            setLocked(false);
            setShrunken(false);
          } else {
            setShrunken(false);
          }
        }
        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }
    }
  });

  const handleListItemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const handleLockClick = () => {
    setLocked(!Locked);
  };

  return (
    <div
      className={styles.navSidebar_container}
      id="navSidebar"
      style={Locked ? { width: "20rem" } : { width: "" }}
    >
      <img src={process.env.NEXT_PUBLIC_LOGO} className={styles.navLogo}></img>
      <FancyHR></FancyHR>
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
      {Locked ? (
        <BottomPanel
          isShrunken={Shrunken}
          isLocked={Locked}
          handleLockClick={handleLockClick}
          styles={styles}
        />
      ) : Shrunken ? (
        <BottomPanel
          isShrunken={Shrunken}
          isLocked={Locked}
          handleLockClick={handleLockClick}
          styles={styles}
        />
      ) : (
        <ShrunkenBottomPanel
          isShrunken={Shrunken}
          isLocked={Locked}
          handleLockClick={handleLockClick}
          styles={styles}
        />
      )}
    </div>
  );
};

export default Sidebar;
