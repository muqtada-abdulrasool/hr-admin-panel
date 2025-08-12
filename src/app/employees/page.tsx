"use client";

import Sidebar from "@/components/navigation-sidebar/navSidebar";
import Header from "@/components/header/header";
import List from "@/components/list/list";

import styles from "./employees.module.css";

import { Button, Typography } from "@mui/material";
import Plus from "@mui/icons-material/Add";
import { exampleEmployees } from "@/utils/example-data";
import HomePage from "@/components/home-page/home-page";

export default function Home() {
  const handleRowClick = (row: any, key: number) => {
    if (typeof window !== undefined) {
      window.location.href = window.location.href + "/" + key.toString();
    }
  };

  let examplerows: string[][];
  examplerows = exampleEmployees;

  const Content = (
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
  );

  return <HomePage content={Content} sideBarIndex={2}></HomePage>;
}
