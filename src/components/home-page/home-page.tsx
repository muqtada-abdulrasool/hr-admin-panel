import React, { useState } from "react";
import styles from "./homepage.module.css";

import Sidebar from "@/components/navigation-sidebar/navSidebar";
import Header from "@/components/header/header";

interface HomePageProps {
  content: any;
  sideBarIndex?: number;
  headerTite?: string;
}

const HomePage: React.FC<HomePageProps> = ({
  content,
  sideBarIndex = 0,
  headerTite = "Muqtada Abdulrasool",
}) => {
  const [popup, setPopup] = useState(false);
  return (
    <div className={styles.home_page_container}>
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
        callback={() => {
          setPopup(false);
        }}
      ></Sidebar>
      <div className={styles.home_content_container}>
        <Header
          Title={headerTite}
          HamburgerFunction={() => {
            setPopup(true);
          }}
        ></Header>
        <div className={styles.content_container}>{content}</div>
      </div>
    </div>
  );
};

export default HomePage;
