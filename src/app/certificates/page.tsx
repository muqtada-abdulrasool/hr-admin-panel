"use client";

import styles from "./certificates.module.css";

import { useUserApi } from "@/auth/devices/user-device";
import HomePage from "@/components/home-page/home-page";
import { useEffect, useState } from "react";
import List from "@/components/list/list";
import UserPanel from "@/components/user-panel/user-panel";
import { useRouter } from "next/navigation";
import Throbber from "@/components/throbber/throbber";
import { exampleCertificates } from "@/utils/example-data";
import RequestPanel from "@/components/request-panel/request-panel";
import { Fab, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import CertificateForm from "@/components/fill-in-forms/certificate-form";
import { Add } from "@mui/icons-material";
import CertificatePanel from "@/components/certificate-panel/certificate-panel";

export default function Home() {
  // const router = useRouter();
  // const [pagination, setPagination] = useState(10);
  // const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(-1);

  const [newCer, setNewCer] = useState(false);
  function handleClose() {
    setNewCer(false);
  }
  function handleConfirm() {
    setNewCer(false);
  }

  // const [searchText, setSearchText] = useState(["", "", "0", ""]);
  // const [searchAttribute, setSearchAttribute] = useState(0);

  // const { getUser, userData } = useUserApi();

  // useEffect(() => {
  //   getUser(searchText[2], page + 1, pagination, searchText[0]);
  //   console.log(selected);
  // }, [getUser, pagination, page, searchText, searchAttribute]);

  // if (userData != undefined) {
  //   let JSONBODY = JSON.parse(userData);
  //   let columns = ["Email", "Roles", "User ID", "Status"];
  //   let total = JSONBODY.total;
  //   let rows = JSONBODY.data.map((user: any) => [
  //     user.email,
  //     user.roles.join(", "),
  //     user.user_id,
  //     user.entity_Status,
  //   ]);

  let columns = [
    "Name",
    "Submition Date",
    "Expiration Date",
    "Subject",
    "Points to Skills",
  ];
  let exampleRows = exampleCertificates;

  const content = (
    <div className={styles.content_container}>
      <CertificateForm
        state={newCer}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      ></CertificateForm>
      <div className={styles.list_container}>
        <List
          listTitle="Test Certificates Table"
          columns={columns}
          rows={exampleRows}
          total={exampleRows.length}
          pagination={[2, 4, 10]}
          setURLSelected={setSelected}
          funcComponents={[
            <Fab color="primary" onClick={() => setNewCer(true)}>
              <Add />
            </Fab>,
          ]}
          // URLPagination={pagination}
          // setURLPagination={setPagination}
          // URLPage={page}
          // setURLPage={setPage}
          // URLSearch={searchText}
          // setURLSearch={setSearchText}
          // setURLSearchAttribute={setSearchAttribute}
          // onDoubleClick={() => {
          //   router.push("/employees/" + selected);
          // }}
          searchBox
          denseButton
          denseFromStart
        ></List>
      </div>
      {selected == -1 ? null : (
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
      sideBarIndex={3}
    ></HomePage>
  );
}
// else {
//   return (
//     <HomePage
//       content={<Throbber></Throbber>}
//       contextBoxVisibility={false}
//       sideBarIndex={1}
//     ></HomePage>
//   );
// }
// }
