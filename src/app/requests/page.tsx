"use client";

import styles from "./requests.module.css";

import HomePage from "@/components/home-page/home-page";
import { useMemo, useState } from "react";
import List from "@/components/list/list";
import { exampleRequests } from "@/utils/example-data";
import RequestPanel from "@/components/request-panel/request-panel";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Capsule from "@/components/capsule/capsule";

export default function Home() {
  const [selected, setSelected] = useState(-1);
  const [filterType, setFilterType] = useState("all");

  const columns = ["Name", "Details", "Sender", "Roadmap", "Status"];

  // Process rows with proper status capsules
  const processedRows = useMemo(() => {
    return exampleRequests.map((req) => {
      const title = req[0];
      const details = req[1];
      const sender = req[2];
      const roadmap = req[3];
      const rawStatus = (req[4] || "").toString();

      let statusCapsule = <Capsule color="warning-main" text="Pending" />;
      let category = "pen";

      if (rawStatus.includes("Finished") || rawStatus.includes("Approved") || rawStatus.includes("✅")) {
        statusCapsule = <Capsule color="success-main" text="Approved" />;
        category = "app";
      } else if (rawStatus.includes("Progress") || rawStatus.includes("⚙️")) {
        statusCapsule = <Capsule color="niceBlue" text="In Progress" />;
        category = "prog";
      } else if (rawStatus.includes("Declined")) {
        statusCapsule = <Capsule color="niceRed" text="Declined" />;
        category = "dec";
      } else {
        statusCapsule = <Capsule color="warning-main" text="Pending" />;
        category = "pen";
      }

      return {
        displayRow: [title, details, sender, roadmap, statusCapsule],
        category,
        title,
        details,
        sender,
        roadmap,
      };
    });
  }, []);

  const filteredItems = useMemo(() => {
    if (filterType === "all") return processedRows;
    return processedRows.filter((item) => item.category === filterType);
  }, [processedRows, filterType]);

  const displayTableRows = useMemo(() => {
    return filteredItems.map((item) => item.displayRow);
  }, [filteredItems]);

  const selectedItem =
    selected >= 0 && selected < filteredItems.length
      ? filteredItems[selected]
      : null;

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterType(event.target.value);
    setSelected(-1);
  };

  const content = (
    <div className={styles.content_container}>
      <div className={styles.list_container}>
        <List
          listTitle="Requests"
          columns={columns}
          rows={displayTableRows}
          total={displayTableRows.length}
          pagination={[5, 10, 25]}
          setURLSelected={setSelected}
          leftFuncComponents={[
            <FormControl key="filter-select" size="small" sx={{ minWidth: "8rem" }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterType}
                label="Status"
                onChange={handleFilterChange}
                autoWidth
              >
                <MenuItem value="all">ALL</MenuItem>
                <MenuItem value="pen">PENDING</MenuItem>
                <MenuItem value="prog">IN PROGRESS</MenuItem>
                <MenuItem value="app">APPROVED</MenuItem>
                <MenuItem value="dec">DECLINED</MenuItem>
              </Select>
            </FormControl>,
          ]}
          searchBox
          denseButton
          denseFromStart
        />
      </div>
      {selectedItem ? (
        <RequestPanel
          requestTitle={selectedItem.title}
          requestSender={selectedItem.sender}
          requestAttachment="/images/placeholder/ein.jpg"
          requestDetails={selectedItem.details}
          requestRoadmap={selectedItem.roadmap}
        />
      ) : null}
    </div>
  );

  return (
    <HomePage
      content={content}
      contextBoxVisibility={false}
      sideBarIndex={1}
    />
  );
}
