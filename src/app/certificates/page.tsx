"use client";

import styles from "./certificates.module.css";

import HomePage from "@/components/home-page/home-page";
import { useState } from "react";
import List from "@/components/list/list";
import { exampleCertificates } from "@/utils/example-data";
import { Fab } from "@mui/material";
import CertificateForm from "@/components/fill-in-forms/certificate-form";
import { Add } from "@mui/icons-material";
import CertificatePanel from "@/components/certificate-panel/certificate-panel";

export default function Home() {
  const [selected, setSelected] = useState(-1);
  const [newCer, setNewCer] = useState(false);

  function handleClose() {
    setNewCer(false);
  }
  function handleConfirm() {
    setNewCer(false);
  }

  const columns = [
    "Name",
    "Submission Date",
    "Expiration Date",
    "Subject",
    "Points to Skills",
  ];
  const exampleRows = exampleCertificates;

  const selectedCert =
    selected >= 0 && selected < exampleRows.length
      ? exampleRows[selected]
      : null;

  const content = (
    <div className={styles.content_container}>
      <CertificateForm
        state={newCer}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
      <div className={styles.list_container}>
        <List
          listTitle="Certificates"
          columns={columns}
          rows={exampleRows}
          total={exampleRows.length}
          pagination={[5, 10, 25]}
          setURLSelected={setSelected}
          rightFuncComponents={[
            <Fab key="add-cert" color="primary" onClick={() => setNewCer(true)}>
              <Add />
            </Fab>,
          ]}
          searchBox
          denseButton
          denseFromStart
        />
      </div>
      {selectedCert ? (
        <CertificatePanel
          certificateTitle={selectedCert[0]}
          certificateDetails={`Professional certification in ${selectedCert[3]}, issued on ${selectedCert[1]} and valid through ${selectedCert[2]}. Awarded ${selectedCert[4]} points toward relevant technical competencies.`}
          certificateAttachment="/images/placeholder/ein.jpg"
          skillsAndPoints={[
            { name: selectedCert[3], level: Number(selectedCert[4]) || 50 },
            {
              name: "Technical Proficiency",
              level: Math.min(100, Math.round((Number(selectedCert[4]) || 50) * 0.8)),
            },
            {
              name: "Domain Knowledge",
              level: Math.min(100, Math.round((Number(selectedCert[4]) || 50) * 0.6)),
            },
          ]}
        />
      ) : null}
    </div>
  );

  return (
    <HomePage
      content={content}
      contextBoxVisibility={false}
      sideBarIndex={3}
    />
  );
}
