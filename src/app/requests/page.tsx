"use client";

import styles from "./requests.module.css";

import { useUserApi } from "@/auth/devices/user-device";
import HomePage from "@/components/home-page/home-page";
import { useEffect, useState } from "react";
import List from "@/components/list/list";
import UserPanel from "@/components/user-panel/user-panel";
import { useRouter } from "next/navigation";
import Throbber from "@/components/throbber/throbber";
import { exampleRequests } from "@/utils/example-data";
import RequestPanel from "@/components/request-panel/request-panel";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function Home() {
  // const router = useRouter();
  // const [pagination, setPagination] = useState(10);
  // const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(-1);

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

  let columns = ["Name", "Details", "Sender", "Roadmap", "Status"];
  let exampleRows = exampleRequests;

  const content = (
    <div className={styles.content_container}>
      <div className={styles.list_container}>
        <List
          listTitle="Test Requests Table"
          columns={columns}
          rows={exampleRows}
          total={exampleRows.length}
          pagination={[2, 4, 10]}
          setURLSelected={setSelected}
          leftFuncComponents={[
            <FormControl size="medium">
              <InputLabel>Filter Type</InputLabel>
              <Select
                value={"all"}
                label="Language"
                // onChange={handleLangChange}
                autoWidth
              >
                <MenuItem value="all">ALL</MenuItem>
                <MenuItem value="pen">PENDING</MenuItem>
                <MenuItem value="dec">DECLINED</MenuItem>
                <MenuItem value="app">APPROVED</MenuItem>
              </Select>
            </FormControl>,
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
        <RequestPanel
          requestTitle="Roadmap Step Requeast"
          requestSender="Ali Maadrymino"
          requestAttachment="/images/placeholder/ein.jpg"
          requestDetails="I was stuck here for so long, like, OMG. Jeez, who thought you needed to have Wi-Fi to pass the CCNA test? Like, NO ONE WOULD KNOW. Jeez, you guys make it difficult."
          requestRoadmap="cool roadmap"
        ></RequestPanel>
      )}
    </div>
  );
  return (
    <HomePage
      content={content}
      contextBoxVisibility={false}
      sideBarIndex={1}
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
