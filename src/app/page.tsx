"use client";

import { useUserApi } from "@/auth/devices/user-device";
import HomePage from "@/components/home-page/home-page";
import { useEffect, useState } from "react";
import List from "@/components/list/list";
import { Typography } from "@mui/material";
import Throbber from "@/components/throbber/throbber";

export default function Home() {
  const [pagination, setPagination] = useState(10);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(-1);

  const [searchText, setSearchText] = useState(["", "", "0", ""]);
  const [searchAttribute, setSearchAttribute] = useState(0);

  const { loading, userData, getUser } = useUserApi();

  useEffect(() => {
    getUser(searchText[2], page + 1, pagination, searchText[0]);
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
      <div>
        <List
          listTitle="Test Table :)"
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
          searchBox
        ></List>
        {selected == -1 ? null : <Typography>meow</Typography>}
      </div>
    );
    return <HomePage content={content}></HomePage>;
  } else {
    return (
      <HomePage
        content={<Throbber></Throbber>}
        contextBoxVisibility={false}
      ></HomePage>
    );
  }
}
