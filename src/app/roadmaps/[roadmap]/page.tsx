"use client";

import React, { useState } from "react";
import styles from "./roadmap.module.css";

import HomePage from "@/components/home-page/home-page";
import Roadmap from "@/components/vertical-map/vertical-map";
import List from "@/components/list/list";
import { exampleActiveEmployees } from "@/utils/example-data";
import CertificatePanel from "@/components/certificate-panel/certificate-panel";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [cer, setCer] = useState(false);
  let columns = ["Name", "Current Progress"];
  let exampleRows = exampleActiveEmployees;

  function handleCerClick(ID: string) {
    setCer(true);
  }

  function handleEmployeeClick() {
    router.push("/employees/1");
  }

  const content = (
    <div className={styles.roadmap_container}>
      <Roadmap
        setCertificate={handleCerClick}
        steps={[
          { title: "Obtain CCNA 2025", certificateId: "14212" },
          { title: "Obtain CCNA 2025", certificateId: "14212" },
          { title: "Obtain CCNA 2025", certificateId: "14212" },
          { title: "Obtain CCNA 2025", certificateId: "14212" },
          { title: "Obtain CCNA 2025", certificateId: "14212" },
          { title: "Obtain CCNA 2025", certificateId: "14212" },
          { title: "Obtain CCNA 2025", certificateId: "14212" },
          { title: "Obtain CCNA 2025", certificateId: "14212" },
          { title: "Obtain CCNA 2025", certificateId: "14212" },
        ]}
      />
      <div className={styles.employees_container}>
        <List
          columns={columns}
          rows={exampleRows}
          total={exampleRows.length}
          onDoubleClick={handleEmployeeClick}
        ></List>
      </div>
      {!cer ? null : (
        <CertificatePanel
          certificateTitle="CCNA 2025: Cisco Certified Network Associate"
          certificateDetails="This certification validates a professional's foundational knowledge of networking. The CCNA 2025 exam covers a broad range of topics including network fundamentals, IP connectivity, security, automation, and programmability."
          certificateAttachment="/images/placeholder/ein.jpg"
          skillsAndPoints={[
            { name: "Network", level: 30 },
            { name: "Back-End", level: 19 },
            { name: "C++", level: 18 },
            { name: "C#", level: 10 },
          ]}
        />
      )}
    </div>
  );
  return (
    <HomePage
      sideBarIndex={-1}
      content={content}
      contextBoxVisibility={false}
    ></HomePage>
  );
}
