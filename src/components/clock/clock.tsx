import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

// Define the StylishClock component.
const StylishClock = () => {
  // Initialize the time state with the current time.
  const [time, setTime] = useState(new Date());

  // Use useEffect to update the time every second.
  useEffect(() => {
    // Set up an interval to call the function every 1000 milliseconds (1 second).
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts.
    return () => clearInterval(timerId);
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  // Format the time to display hours, minutes, seconds, and AM/PM.
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour format.
  });

  // Format the date to display the day, month, and year.
  const formattedDate = time.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Stack the time and date vertically.
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: "bold",
          color: "primary.main", // Using a primary color for emphasis.
          //   fontFamily: "monospace", // A monospace font for a digital clock feel.
        }}
      >
        {formattedTime}
      </Typography>
      <Typography
        variant="body2"
        component="div"
        sx={{
          marginTop: "4px",
          color: "text.secondary", // Use a secondary text color for a subtle look.
        }}
      >
        {`${time.toLocaleDateString("en-US", {
          day: "2-digit",
        })}/${time.toLocaleDateString("en-US", {
          month: "2-digit",
        })}/${time.toLocaleDateString("en-US", { year: "numeric" })}`}
      </Typography>
    </Box>
  );
};

export default StylishClock;
