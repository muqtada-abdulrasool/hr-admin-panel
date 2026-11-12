import React from "react";
import styles from "./userpanel.module.css";

import { Button, Typography } from "@mui/material";

import FancyHR from "@/components/fancy-hr/fancy-hr";
import PFP from "@/components/user-pfp/user-pfp";
import InfoBox from "@/components/information-box/information-box";
import SkillBox from "@/components/skill-box/skill-box";
import { ConfirmPopup } from "../dialoge-popup/dialogue-popup";
import EmployeeForm from "@/components/fill-in-forms/employee-form";

export interface UserPanelProps {
  employee?:
    | any[]
    | {
        name?: string;
        email?: string;
        phoneNumber?: string;
        dateOfEmployment?: string;
        position?: string;
      };
}

const UserPanel: React.FC<UserPanelProps> = ({ employee }) => {
  const [del, setDel] = React.useState(false);
  function deleteCurrentUser() {
    console.log("User is deleted");
    setDel(false);
  }

  const [newEmp, setNewEmp] = React.useState(false);
  function handleClose() {
    setNewEmp(false);
  }
  function handleConfirm() {
    setNewEmp(false);
  }

  let empName = "Muqtada Abdulrasool";
  let empEmail = "Muqtada@gmail.com";
  let empPhone = "07708415865";
  let empDate = "22/4/2023";
  let empPosition = "Front-End Dev";

  if (Array.isArray(employee)) {
    empName = typeof employee[0] === "string" ? employee[0] : empName;
    empPhone = typeof employee[1] === "string" ? employee[1] : empPhone;
    empPosition = typeof employee[2] === "string" ? employee[2] : empPosition;
    empDate = typeof employee[3] === "string" ? employee[3] : empDate;
    empEmail = empName.toLowerCase().replace(/\s+/g, ".") + "@company.com";
  } else if (employee && typeof employee === "object") {
    empName = employee.name || empName;
    empEmail =
      employee.email ||
      empName.toLowerCase().replace(/\s+/g, ".") + "@company.com";
    empPhone = employee.phoneNumber || empPhone;
    empDate = employee.dateOfEmployment || empDate;
    empPosition = employee.position || empPosition;
  }

  const info = [
    ["NAME", empName],
    ["EMAIL", empEmail],
    ["PHONE NUMBER", empPhone],
    ["DATE OF EMPLOYMENT", empDate],
    ["POSITION", empPosition],
  ];

  return (
    <div className={styles.user_panel_container}>
      <div className={styles.user_panel}>
        <ConfirmPopup
          state={del}
          header="Confirm"
          body="Are you sure you want to delete this user? This action cannot be reverted."
          color="error"
          handleClose={() => setDel(false)}
          handleConfirm={() => deleteCurrentUser()}
        ></ConfirmPopup>

        <EmployeeForm
          state={newEmp}
          handleClose={handleClose}
          handleConfirm={handleConfirm}
        ></EmployeeForm>

        <div className={styles.user_scroll_panel}>
          <PFP roundness="10%" size="12rem" image="/images/User.png"></PFP>
          <FancyHR></FancyHR>
          <InfoBox info={info}></InfoBox>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              onClick={() => setNewEmp(true)}
              sx={{
                height: "2rem",
                width: "70%",
              }}
            >
              <Typography
                variant="subtitle1"
                color="var(--mui-palette-primary-contrastText)"
              >
                Edit Profile
              </Typography>
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setDel(true)}
              sx={{
                height: "2rem",
                width: "30%",
              }}
            >
              <Typography
                variant="subtitle1"
                color="var(--mui-palette-primary-contrastText)"
              >
                Delete
              </Typography>
            </Button>
          </div>
          <SkillBox
            title="Skills"
            skills={[
              { name: "Front-End", level: 85 },
              { name: "TypeScript", level: 75 },
              { name: "React", level: 80 },
              { name: "Next.js", level: 70 },
              { name: "UI/UX Design", level: 65 },
              { name: "C++", level: 40 },
              { name: "Python", level: 35 },
              { name: "DevOps", level: 30 },
            ]}
          ></SkillBox>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
