import React from "react";
import styles from "./skillbox.module.css";
import { Typography } from "@mui/material";

interface SkillBoxProps {
  title?: string;
  skills: { name: string; level: number }[];
}

const SkillBox: React.FC<SkillBoxProps> = ({ title = "Skillbox", skills }) => {
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  return (
    <div className={styles.skillbox_container}>
      <div
        style={{
          transform: "translateY(16px)",
          background: "var(--mui-palette-foreground)",
        }}
      >
        <Typography variant="h6">{title}</Typography>
      </div>
      <div className={styles.skillbox}>
        <div className={styles.skill_scroll_container}>
          {skills.map((skill) => (
            <div
              className={styles.skill}
              style={{ background: getRandomColor() }}
            >
              <Typography variant="subtitle1">{skill.name}</Typography>
              <div style={{ width: "10px" }}></div>
              <Typography variant="subtitle1">{skill.level}</Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillBox;
