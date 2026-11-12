"use client";

import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export default function NotFound() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "var(--mui-palette-background-default)",
        p: 3,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 480,
          width: "100%",
          p: 4,
          textAlign: "center",
          borderRadius: 3,
          backgroundColor: "var(--mui-palette-foreground)",
        }}
      >
        <SearchOffIcon
          sx={{
            fontSize: "5rem",
            color: "var(--mui-palette-primary-main)",
            mb: 2,
          }}
        />
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: 800, color: "var(--mui-palette-text-primary)" }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 600, color: "var(--mui-palette-text-primary)" }}
        >
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          The page you requested could not be found or may have been moved.
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => router.push("/")}
          sx={{
            px: 4,
            py: 1.2,
            fontWeight: 700,
            borderRadius: 2,
          }}
        >
          Return to Overview
        </Button>
      </Paper>
    </Box>
  );
}
