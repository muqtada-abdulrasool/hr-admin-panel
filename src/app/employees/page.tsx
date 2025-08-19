"use client";

import React from "react";
import styles from "./employees.module.css";
import List from "@/components/list/list";

import { Fab } from "@mui/material";
import Plus from "@mui/icons-material/Add";
import { exampleEmployees } from "@/utils/example-data";
import HomePage from "@/components/home-page/home-page";

export default function Home() {
  const handleRowClick = (row: any, key: number) => {
    if (typeof window !== "undefined") {
      window.location.href = window.location.href + "/" + key.toString();
    }
  };

  let examplerows: string[][];
  examplerows = exampleEmployees;

  const Content = (
    <List
      title="Employees"
      search
      dense={false}
      denseButton
      func={[
        <Fab
          size="medium"
          variant="circular"
          color="primary"
          sx={{ color: "var(--mui-palette-primary-contrastText)" }}
        >
          <Plus />
        </Fab>,
      ]}
      onclick={(row, key) => handleRowClick(row, key)}
      columns={["Full Name", "Mobile", "Position", "Date of Employement"]}
      rows={examplerows}
    ></List>
  );

  return <HomePage content={Content} sideBarIndex={2}></HomePage>;
}
