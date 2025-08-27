"use client";

import styles from "./overview.module.css";

import HomePage from "@/components/home-page/home-page";
import {
  CertificatesWidget,
  EmployeesWidget,
  RequestsWidget,
  RoadmapsWidget,
} from "@/components/overview-widget/overview-widget";

export default function Home() {
  const content = (
    <div className={styles.content_container}>
      <RequestsWidget></RequestsWidget>
      <EmployeesWidget></EmployeesWidget>
      <CertificatesWidget></CertificatesWidget>
      <RoadmapsWidget></RoadmapsWidget>
    </div>
  );
  return <HomePage content={content} contextBoxVisibility={false}></HomePage>;
}
