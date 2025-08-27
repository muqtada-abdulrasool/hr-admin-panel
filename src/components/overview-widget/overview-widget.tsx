import React from "react";
import { BarChart, PieChart } from "@mui/x-charts";

import styles from "./overviewwidget.module.css";
import { Button, Typography } from "@mui/material";
import FancyHR from "../fancy-hr/fancy-hr";

interface WidgetProps {
  title: string;
}

const Data = [20, 13, 49];

const Labels = ["PENDING", "APPROVED", "DECLINED"];

const availableCertificates = 120;
const availableSkills = 350;

export function RequestsWidget() {
  return (
    <div className={styles.widget} style={{ minWidth: "24rem" }}>
      <Typography variant="h4" align="center">
        REQUESTS
      </Typography>
      <BarChart
        series={[
          {
            data: Data,
            label: "Requests",
            color: "var(--mui-palette-niceBlue)",
          },
        ]}
        xAxis={[{ data: Labels }]}
        yAxis={[{ width: 50 }]}
        barLabel={"value"}
        height={200}
        hideLegend
      />
      <Button variant="contained">Open Request Panel</Button>
    </div>
  );
}

export function EmployeesWidget() {
  return (
    <div className={styles.widget}>
      <Typography variant="h4" align="center">
        EMPLOYEES
      </Typography>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "In Roadmap" },
              { id: 1, value: 15, label: "Not in Roadmap" },
            ],
            arcLabel: "value",
          },
        ]}
        width={200}
        height={200}
      />
      <Button variant="contained">Open Employees Panel</Button>
    </div>
  );
}

export function CertificatesWidget() {
  return (
    <div className={styles.widget}>
      <Typography variant="h4" align="center">
        CERTIFICATES
      </Typography>

      {/* COOL STYLING HERE */}
      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <Typography variant="h6" className={styles.stat}>
            Certificates
          </Typography>
          <Typography variant="h2" className={styles.stat}>
            {availableCertificates}
          </Typography>
        </div>
        <div className={styles.statBox}>
          <Typography variant="h6" className={styles.stat}>
            Skills
          </Typography>
          <Typography variant="h2" className={styles.stat}>
            {availableSkills}
          </Typography>
        </div>
      </div>

      <Button variant="contained">Open Certificates Panel</Button>
    </div>
  );
}

export function RoadmapsWidget() {
  return (
    <div className={styles.widget}>
      <Typography variant="h4" align="center">
        ROADMAPS
      </Typography>

      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 18, label: "Roadmaps" },
              { id: 1, value: 8, label: "Active" },
              { id: 2, value: 10, label: "inactive" },
            ],
            arcLabel: "value",
          },
        ]}
        width={200}
        height={200}
      />

      <Button variant="contained">Open Roadmaps Panel</Button>
    </div>
  );
}
