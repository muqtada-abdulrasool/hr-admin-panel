"use client";

import React, { useState } from "react";
import styles from "./roadmap.module.css";

import HomePage from "@/components/home-page/home-page";
import Roadmap from "@/components/vertical-map/vertical-map";
import List from "@/components/list/list";
import { exampleActiveEmployees } from "@/utils/example-data";
import CertificatePanel from "@/components/certificate-panel/certificate-panel";
import { useRouter } from "next/navigation";

export default function RoadmapDetailClient() {
  const router = useRouter();
  const [cer, setCer] = useState(false);
  const columns = ["Name", "Current Progress"];
  const exampleRows = exampleActiveEmployees;

  function handleCerClick(ID: string) {
    setCer(true);
  }

  function handleEmployeeClick() {
    router.push("/employees/1");
  }

  const steps = [
    { title: "Network Fundamentals (CompTIA Network+)", certificateId: "14201" },
    { title: "Cybersecurity Core (CompTIA Security+)", certificateId: "14202" },
    { title: "Routing & Switching (CCNA 2025)", certificateId: "14203" },
    { title: "Linux Administration (RHCSA)", certificateId: "14204" },
    { title: "Cloud Architecture (AWS Associate)", certificateId: "14205" },
    { title: "DevOps & Containers (CKA)", certificateId: "14206" },
    { title: "Senior Enterprise Architect (CCNP)", certificateId: "14207" },
  ];

  const content = (
    <div className={styles.roadmap_container}>
      <Roadmap
        title="Network & Systems Engineering Roadmap"
        setCertificate={handleCerClick}
        steps={steps}
      />
      <div className={styles.employees_container}>
        <List
          listTitle="Enrolled Employees"
          columns={columns}
          rows={exampleRows}
          total={exampleRows.length}
          onDoubleClick={handleEmployeeClick}
        />
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
      sideBarIndex={4}
      content={content}
      contextBoxVisibility={false}
    />
  );
}
