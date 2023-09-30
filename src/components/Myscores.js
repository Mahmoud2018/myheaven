import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // marginLeft: theme.spacing(1),
  borderRadius: "10px",
  textAlign: "center",
  // fontFamily: "BakbakOne",
  color: theme.palette.text.secondary,
}));

export default function Myscores({ score, tree, Plam, Box, home, castle }) {
  return (
    <Grid container spacing={2} style={{ fontWeight: "bold" }}>
      <Item item xs={1}>
        <img
          src={"scores/1.png"}
          style={{ width: 30, height: 30 }}
          alt="Logo"
        />
        <Typography
          color="primary"
          style={{ fontFamily: "Rocher", fontSize: 20 }}
        >
          {score + 0}
        </Typography>
        <Typography color="primary" style={{ fontSize: 10 }}>
          ذهب
        </Typography>
      </Item>
      <Item item xs={1}>
        <img
          src={"scores/2.png"}
          style={{ width: 30, height: 30 }}
          alt="Logo"
        />
        <Typography
          color="primary"
          style={{ fontFamily: "Rocher", fontSize: 20 }}
        >
          {tree + 0}
        </Typography>
        <Typography color="primary" style={{ fontSize: 10 }}>
          شجرة
        </Typography>
      </Item>

      <Item item xs={1}>
        <img
          src={"scores/3.png"}
          style={{ width: 30, height: 30 }}
          alt="Logo"
        />
        <Typography
          color="primary"
          style={{ fontFamily: "Rocher", fontSize: 20 }}
        >
          {Plam + 0}
        </Typography>
        <Typography color="primary" style={{ fontSize: 10 }}>
          نخلة
        </Typography>
      </Item>

      <Item item xs={1}>
        <img
          src={"scores/4.png"}
          style={{ width: 30, height: 30 }}
          alt="Logo"
        />
        <Typography
          color="primary"
          style={{ fontFamily: "Rocher", fontSize: 20 }}
        >
          {" "}
          {Box + 0}
        </Typography>
        <Typography color="primary" style={{ fontSize: 10 }}>
          كنز
        </Typography>
      </Item>

      <Item item xs={1}>
        <img
          src={"scores/5.png"}
          style={{ width: 30, height: 30 }}
          alt="Logo"
        />
        <Typography
          color="primary"
          style={{ fontFamily: "Rocher", fontSize: 20 }}
        >
          {home + 0}
        </Typography>
        <Typography color="primary" style={{ fontSize: 10 }}>
          بيت
        </Typography>
      </Item>

      <Item item xs={1}>
        {" "}
        <img
          src={"scores/6.png"}
          style={{ width: 30, height: 30 }}
          alt="Logo"
        />
        <Typography
          color="primary"
          style={{ fontFamily: "Rocher", fontSize: 20 }}
        >
          {castle + 0}
        </Typography>
        <Typography color="primary" style={{ fontSize: 10 }}>
          قصر
        </Typography>
      </Item>
    </Grid>
  );
}
