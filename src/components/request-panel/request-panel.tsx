import React from "react";
import styles from "./requestpanel.module.css";
import { Button, Typography } from "@mui/material";
import { ConfirmPopup } from "../dialoge-popup/dialogue-popup";
import FancyHR from "../fancy-hr/fancy-hr";
import AttachmentBox from "../attachment-box/attachment-box";

interface RequestPanelProps {
  requestTitle: string;
  requestSender: string;
  requestDetails: string;
  requestAttachment?: string;
  requestRoadmap: string;
}

const RequestPanel: React.FC<RequestPanelProps> = ({
  requestTitle,
  requestSender,
  requestDetails,
  requestAttachment = "",
  requestRoadmap,
}) => {
  const [showAccept, setShowAccept] = React.useState(false);
  const [showDeny, setShowDeny] = React.useState(false);

  function handleAcceptRequest() {
    console.log("Request accepted.");
    setShowAccept(false);
  }

  function handleDenyRequest() {
    console.log("Request denied.");
    setShowDeny(false);
  }

  return (
    <div className={styles.request_panel_container}>
      <div className={styles.request_panel}>
        <ConfirmPopup
          state={showAccept}
          header="Confirm Acceptance"
          body="Are you sure you want to accept this request?"
          color="success"
          handleClose={() => setShowAccept(false)}
          handleConfirm={handleAcceptRequest}
        />
        <ConfirmPopup
          state={showDeny}
          header="Confirm Denial"
          body="Are you sure you want to deny this request?"
          color="error"
          handleClose={() => setShowDeny(false)}
          handleConfirm={handleDenyRequest}
        />

        <div className={styles.request_scroll_panel}>
          <div className={styles.top_section}>
            <Typography variant="h5">{requestTitle}</Typography>

            <FancyHR />

            <AttachmentBox
              clickable={false}
              fullWidth
              imgSrc={requestAttachment}
            />

            <div className={styles.info_container}>
              <Typography variant="h6">By {requestSender}</Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6">Details:</Typography>
                <div className={styles.details_container}>
                  <Typography variant="body1">{requestDetails}</Typography>
                </div>
              </div>
              <div></div>
            </div>
          </div>

          <div className={styles.bottom_section}>
            <Button variant="contained">
              <Typography variant="subtitle1">View Sender Profile</Typography>
            </Button>
            <Button variant="contained">
              <Typography variant="subtitle1">View Roadmap</Typography>
            </Button>

            {/* Accept/Deny Buttons */}
            <div className={styles.action_buttons_container}>
              {/* Accept Button */}
              <Button
                variant="contained"
                color="success"
                onClick={() => setShowAccept(true)}
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
                  Accept
                </Typography>
              </Button>
              {/* Deny Button */}
              <Button
                variant="contained"
                color="error"
                onClick={() => setShowDeny(true)}
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
                  Deny
                </Typography>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPanel;
