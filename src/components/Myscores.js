import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import { Darkmode } from "../App";

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

// console.log(theme);

export default function Myscores({ score, tree, Plam, Box, home, castle }) {
  const theme = useTheme();
  let ms;
  theme.palette.mode === "dark" ? (ms = "Light") : (ms = "Dark");

  return (
    <Grid container="true" spacing={2} style={{ fontWeight: "bold" }}>
      <Item item="true" xs={1}>
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
      <Item item="true" xs={1}>
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

      <Item item="true" xs={1}>
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

      <Item item="true" xs={1}>
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

      <Item item="true" xs={1}>
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

      <Item item="true" xs={1}>
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
      <Item
        item="true"
        xs={1}
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Darkmode style={{ width: 20, height: 20 }} />
        <Typography
          color="primary"
          style={{ fontFamily: "Rocher", fontSize: 12 }}
        >
          {ms}
        </Typography>
        <Typography
          color="primary"
          style={{ fontFamily: "Rocher", fontSize: 12 }}
        >
          Mode
        </Typography>
      </Item>

      {/* <Item item="true" xs={1}>
        <Button>
          {" "}
          <img
            src={"present.gif"}
            alt="Logo"
            style={{ width: 30, height: 30 }}
          />
          <Typography
            color="primary"
            style={{ fontFamily: "Rocher", fontSize: 20 }}
          >
            <Typography color="primary" style={{ fontSize: 10 }}>
              هدية
            </Typography>
            200
          </Typography>
          <img
            src={"scores/1.png"}
            style={{ width: 20, height: 20 }}
            alt="Logo"
          />
        </Button>
      </Item> */}
    </Grid>
  );
}
