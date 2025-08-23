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
                "Date of Acquasition",
                "Date of Expiration",
                "Skills",
                "Points to Skill",
              ]}
              rows={examplerows}
              total={examplerows.length}
              denseButton={false}
              pagination={[25, 50, 100]}
            ></List>,
            <List
              columns={["Title", "Description", "Sender", "Type", "Status"]}
              rows={examplerows2}
              total={examplerows2.length}
              denseButton={false}
              pagination={[25, 50, 100]}
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
              total={examplerows3.length}
              denseButton={false}
              pagination={[25, 50, 100]}
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
