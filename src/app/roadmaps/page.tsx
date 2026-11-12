"use client";

import styles from "./roadmap.module.css";

import HomePage from "@/components/home-page/home-page";
import { useState } from "react";
import List from "@/components/list/list";
import { exampleRoadmaps } from "@/utils/example-data";
import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useRouter } from "next/navigation";
import Roadmap from "@/components/vertical-map/vertical-map";
import CertificatePanel from "@/components/certificate-panel/certificate-panel";
import RoadmapForm from "@/components/fill-in-forms/roadmap-form";

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState(-1);
  const [cer, setCer] = useState(false);
  const [add, setAdd] = useState(false);

  function handleCerClick(ID: string) {
    setCer(true);
  }

  function handleClose() {
    setAdd(false);
  }
  function handleConfirm() {
    setAdd(false);
  }

  function handleDoubleClick() {
    const id = selected >= 0 ? selected + 1 : 1;
    router.push("/roadmaps/" + id);
  }

  const columns = [
    "Title",
    "Step Count",
    "Estimated Completion Time",
    "Difficulty",
  ];
  const exampleRows = exampleRoadmaps;

  const selectedRoadmap =
    selected >= 0 && selected < exampleRows.length
      ? exampleRows[selected]
      : null;

  const defaultSteps = [
    { title: "Foundations & Core Principles", certificateId: "14210" },
    { title: "CompTIA Security+ Certification", certificateId: "14211" },
    { title: "Cisco Certified Network Associate (CCNA)", certificateId: "14212" },
    { title: "Cloud Architecture Fundamentals", certificateId: "14213" },
    { title: "Certified Kubernetes Administrator", certificateId: "14214" },
    { title: "Senior System Engineering Capstone", certificateId: "14215" },
  ];

  const content = (
    <div className={styles.content_container}>
      <RoadmapForm
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        state={add}
      />
      <div className={styles.list_container}>
        <List
          listTitle="Roadmaps"
          columns={columns}
          rows={exampleRows}
          total={exampleRows.length}
          pagination={[5, 10, 25]}
          setURLSelected={setSelected}
          rightFuncComponents={[
            <Fab key="add-roadmap" color="primary" onClick={() => setAdd(true)}>
              <Add />
            </Fab>,
          ]}
          onDoubleClick={handleDoubleClick}
          searchBox
          denseButton
        />
      </div>
      {selected === -1 ? null : (
        <Roadmap
          title={selectedRoadmap ? selectedRoadmap[0] : "Roadmap Progress"}
          setCertificate={handleCerClick}
          steps={defaultSteps}
        />
      )}
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
      content={content}
      contextBoxVisibility={false}
      sideBarIndex={4}
    />
  );
}
