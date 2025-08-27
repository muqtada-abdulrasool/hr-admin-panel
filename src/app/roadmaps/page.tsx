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

  function handleAddClick() {
    setAdd(true);
  }

  function handleClose() {
    setAdd(false);
  }
  function handleConfirm() {
    setAdd(false);
  }

  function handleDoubleClick() {
    router.push("/roadmaps/1");
  }

  let columns = [
    "Title",
    "Step Count",
    "Estimated Completion Time",
    "Difficulty",
  ];
  let exampleRows = exampleRoadmaps;

  const content = (
    <div className={styles.content_container}>
      <RoadmapForm
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        state={add}
      ></RoadmapForm>
      <div className={styles.list_container}>
        <List
          listTitle="Test Roadmaps Table"
          columns={columns}
          rows={exampleRows}
          total={exampleRows.length}
          pagination={[2, 4, 10]}
          setURLSelected={setSelected}
          rightFuncComponents={[
            <Fab color="primary" onClick={() => setAdd(true)}>
              <Add />
            </Fab>,
          ]}
          onDoubleClick={handleDoubleClick}
          searchBox
          denseButton
        ></List>
      </div>
      {selected == -1 ? null : (
        <Roadmap
          setCertificate={handleCerClick}
          steps={[
            { title: "Obtain CCNA 2025", certificateId: "14212" },
            { title: "Obtain Your Mom", certificateId: "14212" },
            { title: "Obtain CCNA 2025", certificateId: "14212" },
            { title: "Obtain CCNA 2025", certificateId: "14212" },
            { title: "Obtain CCNA 2025", certificateId: "14212" },
            { title: "Obtain CCNA 2025", certificateId: "14212" },
            { title: "Obtain CCNA 2025", certificateId: "14212" },
            { title: "Obtain CCNA 2025", certificateId: "14212" },
            { title: "Obtain CCNA 2025", certificateId: "14212" },
          ]}
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
    ></HomePage>
  );
}
