import React from "react";
import styles from "./certificatepanel.module.css";
import { Button, Typography } from "@mui/material";
import { ConfirmPopup } from "../dialoge-popup/dialogue-popup";
import FancyHR from "../fancy-hr/fancy-hr";
import { Attachment, Remove } from "@mui/icons-material";
import AttachmentBox from "../attachment-box/attachment-box";
import SkillBox from "../skill-box/skill-box";
import CertificateForm from "../fill-in-forms/certificate-form";

interface RequestPanelProps {
  certificateTitle: string;
  certificateDetails: string;
  certificateAttachment?: string;
  skillsAndPoints: { name: string; level: number }[];
}

const CertificatePanel: React.FC<RequestPanelProps> = ({
  certificateTitle,
  certificateDetails,
  certificateAttachment,
  skillsAndPoints,
}) => {
  const [edit, setEdit] = React.useState(false);
  const [remove, setRemove] = React.useState(false);

  function handleConfirm() {
    setEdit(false);
  }

  function handleClose() {
    setEdit(false);
  }

  return (
    <div className={styles.certificate_panel_container}>
      <div className={styles.certificate_panel}>
        <CertificateForm
          state={edit}
          handleClose={handleClose}
          handleConfirm={handleConfirm}
        />
        <ConfirmPopup
          state={remove}
          header="Confirm Removal"
          body="Are you sure you want to renive this certificate?"
          color="error"
          handleClose={() => setRemove(false)}
          handleConfirm={() => setRemove(false)}
        />

        <div className={styles.scroll_panel}>
          <div className={styles.top_section}>
            <Typography variant="h5">{certificateTitle}</Typography>

            <FancyHR />

            {/* <div className={styles.attachment_box_container}> */}
            <AttachmentBox
              clickable={false}
              fullWidth
              imgSrc={certificateAttachment}
            />
            {/* </div> */}

            <div className={styles.info_container}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6">Details:</Typography>
                <div className={styles.details_container}>
                  <Typography variant="body1">{certificateDetails}</Typography>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bottom_section}>
            <SkillBox
              title="Skills & Points"
              skills={skillsAndPoints}
            ></SkillBox>
            <div className={styles.action_buttons_container}>
              {/* Edit Button */}
              <Button
                variant="contained"
                color="success"
                onClick={() => setEdit(true)}
                sx={{
                  height: "2rem",
                  width: "50%",
                  borderEndStartRadius: "15px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  color="var(--mui-palette-primary-contrastText)"
                >
                  Edit
                </Typography>
              </Button>
              {/* Deny Button */}
              <Button
                variant="contained"
                color="error"
                onClick={() => setRemove(true)}
                sx={{
                  height: "2rem",
                  width: "50%",
                  borderEndEndRadius: "15px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  color="var(--mui-palette-primary-contrastText)"
                >
                  Remove
                </Typography>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePanel;
