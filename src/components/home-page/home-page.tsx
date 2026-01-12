import React, { useState } from "react";
import styles from "./homepage.module.css";

import Sidebar from "@/components/navigation-sidebar/navSidebar";
import Header from "@/components/header/header";
import SettingsForm from "../fill-in-forms/settings-form";

interface HomePageProps {
  content: any;
  sideBarIndex?: number;
  headerTite?: string;
  contextBoxVisibility?: boolean;
}

const HomePage: React.FC<HomePageProps> = ({
  content,
  sideBarIndex = 0,
  headerTite = "Muqtada Abdulrasool",
  contextBoxVisibility = true,
}) => {
  const [popup, setPopup] = useState(false);
  const [settings, setSettings] = useState(false);
  return (
    <div className={styles.home_page_container}>
      <SettingsForm
        state={settings}
        handleClose={() => {
          setSettings(false);
        }}
        handleConfirm={() => {
          setSettings(false);
        }}
      ></SettingsForm>
      {popup ? (
        <div
          className={`${styles.vail} ${styles.show}`}
          onClick={() => {
            setPopup(false);
          }}
        ></div>
      ) : (
        <div className={`${styles.vail} ${styles.hide}`}></div>
      )}
      <Sidebar
        index={sideBarIndex}
        popup={popup}
        settings={setSettings}
      ></Sidebar>
      <div className={styles.home_content_container}>
        <Header
          Title={headerTite}
          HamburgerFunction={() => {
            setPopup(true);
          }}
        ></Header>
        <div
          className={
            contextBoxVisibility
              ? styles.content_container
              : styles.content_container_invisible
          }
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
