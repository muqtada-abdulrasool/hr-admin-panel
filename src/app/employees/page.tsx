"use client";

import Sidebar from "@/components/navigation-sidebar/navSidebar";
import Header from "@/components/header/header";
import List from "@/components/list/list";

import styles from "./employees.module.css";

import { Button, Typography } from "@mui/material";
import Plus from "@mui/icons-material/Add";
import { exampleEmployees } from "@/utils/example-data";

export default function Home() {
  const handleRowClick = (row: any, key: number) => {
    if (typeof window !== undefined) {
      window.location.href = window.location.href + "/" + key.toString();
    }
  };

  let examplerows: string[][];
  examplerows = exampleEmployees;

  return (
    <div className={styles.home_page_container}>
      <Sidebar index={2}></Sidebar>
      <div className={styles.home_content_container}>
        <Header Title="Muqtada Abdulrasool"></Header>
        <div className={styles.content_container}>
          <List
            title="Table of Employees"
            search
            dense={false}
            denseButton
            func={[
              <Button size="medium" variant="contained" endIcon={<Plus />}>
                <Typography
                  variant="h6"
                  color="var(--mui-palette-primary-contrastText)"
                >
                  CREATE
                </Typography>
              </Button>,
            ]}
            onclick={(row, key) => handleRowClick(row, key)}
            columns={["Full Name", "Mobile", "Position", "Date of Employement"]}
            rows={examplerows}
          ></List>
        </div>
      </div>
    </div>
  );
}
