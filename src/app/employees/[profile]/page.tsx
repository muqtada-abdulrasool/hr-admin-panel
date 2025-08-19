"use client";

import React from "react";
import styles from "./profile.module.css";

import UserPanel from "@/components/user-panel/user-panel";
import TabsContainer from "@/components/tabs-container/tabs-container";
import List from "@/components/list/list";
import {
  exampleCertificates,
  exampleRequests,
  exampleRoadmaps,
} from "@/utils/example-data";
import HomePage from "@/components/home-page/home-page";

export default function Profile() {
  let examplerows: string[][];
  examplerows = exampleCertificates;

  let examplerows2: string[][];
  examplerows2 = exampleRequests;

  let examplerows3: string[][];
  examplerows3 = exampleRoadmaps;

  const Content = (
    <div className={styles.content_container}>
      <UserPanel></UserPanel>
      <div className={styles.lists_container}>
        <TabsContainer
          tabTitles={["CERTIFICATES", "REQUESTS", "ROADMAPS"]}
          defaultTab={1}
          tabs={[
            <List
              columns={[
                "Name",
                "Date of Acquisition",
                "Date of Expiration",
                "Skill",
                "Points to Skill",
              ]}
              rows={examplerows}
              denseButton={false}
              dense={true}
              autoDense={false}
              pagination={[25, 50, 100]}
              color="var(--mui-palette-foreground)"
            ></List>,
            <List
              columns={["Title", "Description", "Sender", "Type", "Status"]}
              rows={examplerows2}
              denseButton={false}
              dense={true}
              autoDense={false}
              pagination={[25, 50, 100]}
              color="var(--mui-palette-foreground)"
            ></List>,
            <List
              columns={[
                "Name",
                "Current Step",
                "Progress",
                "Difficulty",
                "Estimated Completion Time",
              ]}
              rows={examplerows3}
              denseButton={false}
              dense={true}
              autoDense={false}
              pagination={[25, 50, 100]}
              color="var(--mui-palette-foreground)"
            ></List>,
          ]}
        ></TabsContainer>
      </div>
    </div>
  );

  return (
    <HomePage
      content={Content}
      sideBarIndex={-1}
      contextBoxVisibility={false}
    ></HomePage>
  );
}
