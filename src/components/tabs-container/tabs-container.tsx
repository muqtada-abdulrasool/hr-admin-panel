import React from "react";
import styles from "./tabscontainer.module.css";
import { Tab, Tabs } from "@mui/material";
import { error } from "console";

interface TabsContainerProps {
  tabTitles: string[];
  tabs: React.ReactNode[];
  tabFontSize?: string;
  variant?: "fullWidth" | "scrollable" | "standard";
  centered?: boolean;
  defaultTab?: number;
}

const TabsContainer: React.FC<TabsContainerProps> = ({
  tabTitles = [],
  tabs = [],
  tabFontSize = "1rem",
  variant = "fullWidth",
  centered = true,
  defaultTab = 0,
}) => {
  const [selectedTab, setSelectedTab] = React.useState(defaultTab);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  if (tabTitles.length != tabs.length) {
    return <h1>tabTitles and tabs don't match in length.</h1>;
  } else {
    return (
      <div className={styles.tabs_container}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          centered={centered}
          variant={variant}
          className={styles.tab_selector}
        >
          {tabTitles.map((tabTitle, index) => (
            <Tab label={tabTitle} sx={{ fontSize: tabFontSize }} />
          ))}
        </Tabs>
        <div className={styles.tab_container}>
          {tabs.map((tab, index) =>
            selectedTab == index ? tabs[index] : null
          )}
        </div>
      </div>
    );
  }
};
export default TabsContainer;
