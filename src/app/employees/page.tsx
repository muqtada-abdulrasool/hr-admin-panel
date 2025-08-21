"use client";

import styles from "./employees.module.css";

import { useUserApi } from "@/auth/devices/user-device";
import HomePage from "@/components/home-page/home-page";
import { useEffect, useState } from "react";
import List from "@/components/list/list";
import UserPanel from "@/components/user-panel/user-panel";
import { useRouter } from "next/navigation";
import Throbber from "@/components/throbber/throbber";

export default function Home() {
  const router = useRouter();
  const [pagination, setPagination] = useState(10);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(-1);

  const [searchText, setSearchText] = useState(["", "", "0", ""]);
  const [searchAttribute, setSearchAttribute] = useState(0);

  const { getUser, userData } = useUserApi();

  useEffect(() => {
    getUser(searchText[2], page + 1, pagination, searchText[0]);
    console.log(selected);
  }, [getUser, pagination, page, searchText, searchAttribute]);

  if (userData != undefined) {
    let JSONBODY = JSON.parse(userData);
    let columns = ["Email", "Roles", "User ID", "Status"];
    let total = JSONBODY.total;
    let rows = JSONBODY.data.map((user: any) => [
      user.email,
      user.roles.join(", "),
      user.user_id,
      user.entity_Status,
    ]);

    const content = (
      <div className={styles.content_container}>
        <div className={styles.list_container}>
          <List
            listTitle="Test Employees Table"
            columns={columns}
            rows={rows}
            total={total}
            pagination={[2, 4, 10]}
            setURLSelected={setSelected}
            URLPagination={pagination}
            setURLPagination={setPagination}
            URLPage={page}
            setURLPage={setPage}
            URLSearch={searchText}
            setURLSearch={setSearchText}
            setURLSearchAttribute={setSearchAttribute}
            onDoubleClick={() => {
              router.push("/employees/" + selected);
            }}
            searchBox
          ></List>
        </div>
        {selected == -1 ? null : <UserPanel></UserPanel>}
      </div>
    );
    return (
      <HomePage
        content={content}
        contextBoxVisibility={false}
        sideBarIndex={2}
      ></HomePage>
    );
  } else {
    return (
      <HomePage
        content={<Throbber></Throbber>}
        contextBoxVisibility={false}
        sideBarIndex={2}
      ></HomePage>
    );
  }
}
