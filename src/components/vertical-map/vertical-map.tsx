import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Typography, Paper, Box, Button } from "@mui/material";
import styles from "./verticalmap.module.css";
import { RoadmapStep } from "@/interface/roadmap";

interface MapProps {
  title?: string;
  steps: RoadmapStep[];
  setCertificate?: Function | null;
}

export default function Roadmap({
  title = "Roadmap",
  steps,
  setCertificate = null,
}: MapProps) {
  return (
    <div className={styles.map_panel_container}>
      <div className={styles.map_container}>
        <Typography variant="h4" align="center" gutterBottom>
          {title}
        </Typography>
        <div className={styles.scroll_container}>
          <Timeline position="alternate" sx={{ pb: "4rem" }}>
            {steps.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  align={index % 2 === 0 ? "right" : "left"}
                  color="text.primary"
                >
                  {"Step " + index}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary" variant="outlined" />
                  {index < steps.length && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6" component="h1">
                      {item.title}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ width: "100%" }}
                      onClick={
                        setCertificate
                          ? () => {
                              setCertificate(item.certificateId);
                            }
                          : undefined
                      }
                    >
                      Check Certificate
                    </Button>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>
    </div>
  );
}
