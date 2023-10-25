import React, { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { v4 as uuidv4 } from "uuid";
import Paper from "@mui/material/Paper";
import { Card } from "@mui/material";
import Container from "@mui/material/Container";
import { DataContext } from "../contexts/DataContext";
import { Darkmode } from "../App";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

// DIALOG IMPORTS
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import cash from "../Sounds/cash.mp3";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import Brightness1Icon from "@mui/icons-material/Brightness1";

export default function Prayer({ name, time, icon }) {
  const theme = useTheme();
  return (
    <>
      <div style={{ marginBottom: 10 }}></div>

      <Grid
        container
        spacing={1}
        style={{
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          background: theme.palette.mode === "dark" ? "#263238" : "#fff",
        }}
      >
        <Grid xs={1}>{icon}</Grid>
        <Grid xs={2}>
          <Typography
            style={{ margin: "10px", color: "#fbc02d" }}
            gutterBottom
            variant="h6"
          >
            {name}
          </Typography>
        </Grid>
        <Grid xs={8}>
          <Typography
            style={{
              direction: "ltr",
              fontSize: 20,
              fontFamily: "BakbakOne",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
            }}
            gutterBottom
            variant="body2"
          >
            {time}
          </Typography>
        </Grid>
      </Grid>

      {/* <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions> */}
    </>
  );
}
