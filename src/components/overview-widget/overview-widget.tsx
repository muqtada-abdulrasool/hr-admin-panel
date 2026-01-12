import React from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const translatedLabels = [
    t("overview.pending"),
    t("overview.approved"),
    t("overview.declined"),
  ];

  return (
    <div className={styles.widget} style={{ minWidth: "24rem" }}>
      <Typography variant="h4" align="center">
        {t("overview.requests")}
      </Typography>
      <BarChart
        series={[
          {
            data: Data,
            label: t("overview.requests"),
            color: "var(--mui-palette-niceBlue)",
          },
        ]}
        xAxis={[{ data: translatedLabels }]}
        yAxis={[{ width: 50 }]}
        barLabel={"value"}
        height={200}
        hideLegend
      />
      <Button variant="contained">{t("overview.openRequestPanel")}</Button>
    </div>
  );
}

export function EmployeesWidget() {
  const { t } = useTranslation();

  return (
    <div className={styles.widget}>
      <Typography variant="h4" align="center">
        {t("overview.employees")}
      </Typography>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: t("overview.inRoadmap") },
              { id: 1, value: 15, label: t("overview.notInRoadmap") },
            ],
            arcLabel: "value",
          },
        ]}
        width={200}
        height={200}
      />
      <Button variant="contained">{t("overview.openEmployeesPanel")}</Button>
    </div>
  );
}

export function CertificatesWidget() {
  const { t } = useTranslation();

  return (
    <div className={styles.widget}>
      <Typography variant="h4" align="center">
        {t("overview.certificates")}
      </Typography>

      {/* COOL STYLING HERE */}
      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <Typography variant="h6" className={styles.stat}>
            {t("overview.certificates")}
          </Typography>
          <Typography variant="h2" className={styles.stat}>
            {availableCertificates}
          </Typography>
        </div>
        <div className={styles.statBox}>
          <Typography variant="h6" className={styles.stat}>
            {t("overview.skills")}
          </Typography>
          <Typography variant="h2" className={styles.stat}>
            {availableSkills}
          </Typography>
        </div>
      </div>

      <Button variant="contained">{t("overview.openCertificatesPanel")}</Button>
    </div>
  );
}

export function RoadmapsWidget() {
  const { t } = useTranslation();

  return (
    <div className={styles.widget}>
      <Typography variant="h4" align="center">
        {t("overview.roadmaps")}
      </Typography>

      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 18, label: t("overview.roadmaps") },
              { id: 1, value: 8, label: t("overview.active") },
              { id: 2, value: 10, label: t("overview.inactive") },
            ],
            arcLabel: "value",
          },
        ]}
        width={200}
        height={200}
      />

      <Button variant="contained">{t("overview.openRoadmapsPanel")}</Button>
    </div>
  );
}
