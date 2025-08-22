import React, { useEffect, useState } from "react";
import styles from "./attachmentbox.module.css";
import { styled } from "@mui/material/styles";
import { Attachment } from "@mui/icons-material";
import { Button, ButtonBase } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface AttachmentProps {
  clickable?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  imgSrc?: string;
}

function AttachmentBox({
  clickable = true,
  fullHeight = false,
  fullWidth = false,
  imgSrc = "",
}: AttachmentProps) {
  const [attached, setAttached] = useState(false);
  const [image, setImage] = useState("");
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setAttached(true);
    }
  };

  useEffect(() => {
    if (imgSrc != "") {
      setAttached(true);
      setImage(imgSrc);
    }
  }, []);

  return (
    <div
      className={styles.attachment_box_container}
      style={{
        ...(fullWidth && { width: "100%" }),
        ...(fullHeight && { height: "100%" }),
      }}
    >
      <Button
        className={styles.attachment_box}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        disabled={!clickable}
      >
        {!attached ? (
          <Attachment
            fontSize="large"
            sx={{ color: "var(--mui-palette-text-primary)" }}
          />
        ) : (
          <img src={image} className={styles.attachment}></img>
        )}
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => handleImageChange(event)}
          multiple
        />
      </Button>
    </div>
  );
}

export default AttachmentBox;
