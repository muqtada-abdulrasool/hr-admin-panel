"use client";

import styles from "./employees.module.css";

import useUser from "@/auth/devices/user-device";
import HomePage from "@/components/home-page/home-page";
import { useEffect, useState } from "react";
import List from "@/components/list/list";
import UserPanel from "@/components/user-panel/user-panel";
import { useRouter } from "next/navigation";
import Throbber from "@/components/throbber/throbber";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import EmployeeForm from "@/components/fill-in-forms/employee-form";
import { exampleEmployees } from "@/utils/example-data";
import { useAuthContext } from "@/auth/auth-context";

export default function Home() {
  const router = useRouter();
  const [pagination, setPagination] = useState(10);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [searchText, setSearchText] = useState(["", "", "0", ""]);
  const [searchAttribute, setSearchAttribute] = useState(0);

  const auth = useAuthContext();
  const jwt = auth?.jwt;
  const fetchNewJwt = auth?.fetchNewJwt;

  const [newEmp, setNewEmp] = useState(false);
  function handleClose() {
    setNewEmp(false);
  }
  function handleConfirm() {
    setNewEmp(false);
  }

  const { loading, getUsers } = useUser(jwt, fetchNewJwt);
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    if (jwt) {
      getUsers(searchText[2], page + 1, pagination, searchText[0], setUserData);
    }
  }, [jwt, pagination, page, searchText, searchAttribute]);

  // Safe data extraction
  let parsedRows: any[][] = [];
  let parsedTotal = 0;

  if (userData) {
    try {
      const jsonBody =
        typeof userData === "string" ? JSON.parse(userData) : userData;
      if (jsonBody?.data && Array.isArray(jsonBody.data)) {
        parsedRows = jsonBody.data.map((user: any) => {
          if (Array.isArray(user)) return user;
          return [
            user.name || user.email || "Employee",
            user.phoneNumber || user.phone || user.roles?.join(", ") || "",
            user.position || user.roles?.[0] || "Staff",
            user.dateOfEmployment || user.entity_Status || "—",
          ];
        });
        parsedTotal = jsonBody.total || parsedRows.length;
      }
    } catch (err) {
      console.warn("Failed to parse user data:", err);
    }
  }

  // If parsed data is available use it, otherwise fall back to exampleEmployees
  const activeRows = parsedRows.length > 0 ? parsedRows : exampleEmployees;
  const activeTotal = parsedTotal > 0 ? parsedTotal : exampleEmployees.length;

  const content = (
    <div className={styles.content_container}>
      <EmployeeForm
        state={newEmp}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
      <div className={styles.list_container}>
        <List
          listTitle="Employees"
          columns={[
            "Name",
            "Phone Number",
            "Position",
            "Date of Employment",
          ]}
          rows={activeRows}
          total={activeTotal}
          pagination={[5, 10, 20]}
          setURLSelected={setSelected}
          URLPagination={pagination}
          setURLPagination={setPagination}
          URLPage={page}
          setURLPage={setPage}
          URLSearch={searchText}
          setURLSearch={setSearchText}
          setURLSearchAttribute={setSearchAttribute}
          onDoubleClick={() => {
            const id = selected >= 0 ? selected + 1 : 1;
            router.push("/employees/" + id);
          }}
          rightFuncComponents={[
            <Fab key="add-emp" color="primary" onClick={() => setNewEmp(true)}>
              <Add />
            </Fab>,
          ]}
          searchBox
        />
      </div>
      {selected === -1 ? null : (
        <UserPanel employee={activeRows[selected]} />
      )}
    </div>
  );

  return (
    <HomePage
      content={content}
      contextBoxVisibility={false}
      sideBarIndex={2}
    />
  );
}
