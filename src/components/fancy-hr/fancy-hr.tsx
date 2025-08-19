"use client";

import React from "react";

interface FancyHRprops {
  vertical?: boolean;
  length?: string;
  ballsize?: string;
  thickness?: string;
}

const FancyHR: React.FC<FancyHRprops> = ({
  vertical = false,
  length = "100%",
  ballsize = "10px",
  thickness = "0.125rem",
}) => {
  if (!vertical) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: length,
        }}
      >
        <div
          style={{
            backgroundColor: "var(--mui-palette-secondary-main)",
            width: ballsize,
            height: ballsize,
            borderRadius: ballsize,
          }}
        />

        <div
          style={{
            border: "none",
            backgroundColor: "var(--mui-palette-secondary-main)",
            height: thickness,
            width: length,
          }}
        />

        <div
          style={{
            backgroundColor: "var(--mui-palette-secondary-main)",
            width: ballsize,
            height: ballsize,
            borderRadius: ballsize,
          }}
        />
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: length,
        }}
      >
        <div
          style={{
            backgroundColor: "var(--mui-palette-secondary-main)",
            width: ballsize,
            height: ballsize,
            borderRadius: ballsize,
          }}
        />

        <div
          style={{
            border: "none",
            backgroundColor: "var(--mui-palette-secondary-main)",
            height: length,
            width: thickness,
          }}
        />

        <div
          style={{
            backgroundColor: "var(--mui-palette-secondary-main)",
            width: ballsize,
            height: ballsize,
            borderRadius: ballsize,
          }}
        />
      </div>
    );
  }
};

export default FancyHR;
