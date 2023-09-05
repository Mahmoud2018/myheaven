import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

export default function ProgressBar() {
  return (
    <Box
      sx={{ width: "100%" }}
      style={{
        marginTop: "10px",
        fontFamily: "BakbakOne",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        style={{ marginBottom: 10, fontFamily: "BakbakOne", width: 250 }}
      >
        Skills
      </Typography>
      <Typography style={{ fontFamily: "BakbakOne", width: 340 }}>
        IT Technician Support
        <LinearProgress
          variant="determinate"
          value={90}
          style={{
            marginTop: 5,
          }}
        />
        90%
      </Typography>
      <Typography style={{ fontFamily: "BakbakOne", width: 340 }}>
        Windows Server - Cloud - Microsoft 365
        <LinearProgress
          variant="determinate"
          value={65}
          style={{
            marginTop: 5,
          }}
        />
        65%
      </Typography>
      <Typography style={{ fontFamily: "BakbakOne", width: 340 }}>
        Adobe Photoshop - Illustrator- After Effect
        <LinearProgress
          variant="determinate"
          value={80}
          style={{
            marginTop: 5,
          }}
        />
        80%
      </Typography>
      <Typography style={{ fontFamily: "BakbakOne", width: 340 }}>
        Html - CSS - JavaScript - Python - React js
        <LinearProgress
          variant="determinate"
          value={50}
          style={{
            marginTop: 5,
          }}
        />
        50%
      </Typography>
    </Box>
  );
}
