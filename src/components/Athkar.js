import React, { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ReplayIcon from "@mui/icons-material/Replay";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArticleIcon from "@mui/icons-material/Article";
import CardContent from "@mui/material/CardContent";
import { AthkarAlsbah } from "./Data";
import { AthkarAlmsaa } from "./Data";
import { Alsbahnumber } from "./Data";
import { Almsanumber } from "./Data";
import { Container, Divider } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Darkmode } from "../App";
import { useTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import { yellow } from "@mui/material/colors";
import { DataContext } from "../contexts/DataContext";
import Albakara from "./Albakara";

let timeOfAthkar = JSON.parse(localStorage.getItem("timeOfAthkar"));
let titel = JSON.parse(localStorage.getItem("titel"));
let Conten = JSON.parse(localStorage.getItem("Conten"));
let numbers = JSON.parse(localStorage.getItem("numbers"));
let CurrentPage = JSON.parse(localStorage.getItem("CurrentPage"));

export default function Athkar() {
  const [AthkarData, setAthkarData] = useState(Conten === null ? [] : Conten);
  const [modelTitel, setmodelTitel] = useState(titel);
  const [modelContent, setmodelContent] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    CurrentPage === null ? 0 : CurrentPage
  );
  const [num, setnumb] = useState(numbers === null ? 0 : numbers);

  const [time, setTime] = useState(timeOfAthkar === null ? 0 : timeOfAthkar);

  const { display, setDisplay } = useContext(DataContext);

  const Alsbah = AthkarAlsbah.map((item, index) => `${index + 1}- ${item}`);
  const Almsaa = AthkarAlmsaa.map((item, index) => `${index + 1}- ${item}`);
  const Alsbahnumbers = Alsbahnumber.map((item) => {
    return item;
  });
  const Almsanumbers = Almsanumber.map((item) => {
    return item;
  });

  const theme = useTheme();
  let ms;
  theme.palette.mode === "dark"
    ? (ms = " الضوء الفاتح")
    : (ms = "الضوء الليلي");

  function AthkarOpen(time) {
    if (time === 1) {
      setDisplay(1);
      setmodelTitel("أذكار الصباح");
      setAthkarData(Alsbah);
      setnumb(Alsbahnumbers);
      setCurrentPage(0);
      setTime(0);
      localStorage.setItem("titel", JSON.stringify("أذكار الصباح"));
      localStorage.setItem("Conten", JSON.stringify(Alsbah));
      localStorage.setItem("numbers", JSON.stringify(Alsbahnumbers));
      localStorage.setItem("statofAthkar", JSON.stringify(1));
    } else if (time === 2) {
      setDisplay(1);
      setmodelTitel("أذكار المساء");
      setAthkarData(Almsaa);
      setnumb(Almsanumbers);
      setCurrentPage(0);
      setTime(0);
      localStorage.setItem("titel", JSON.stringify("أذكار المساء"));
      localStorage.setItem("Conten", JSON.stringify(Almsaa));
      localStorage.setItem("numbers", JSON.stringify(Almsanumbers));
      localStorage.setItem("statofAthkar", JSON.stringify(1));
    } else {
      setDisplay(2);
      setmodelTitel(" حفظ سورة البقرة في 50 يوم");
      localStorage.setItem(
        "titel",
        JSON.stringify(" حفظ سورة البقرة في 50 يوم")
      );
      localStorage.setItem("statofAthkar", JSON.stringify(2));
    }

    localStorage.setItem("timeOfAthkar", JSON.stringify(time));
  }

  const handleNextPage = () => {
    Reset();
    if (currentPage < AthkarData.length - 1) {
      setCurrentPage(currentPage + 1);
    }
    if (currentPage < Alsbahnumbers.length - 1) {
      setCurrentPage(currentPage + 1);
    }
    if (currentPage < Almsanumbers.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // If we reach the end, loop back to the first page
    }
    localStorage.setItem("CurrentPage", JSON.stringify(currentPage + 1));
  };

  const handlePrevPage = () => {
    Reset();
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      // If we are on the first page, go to the last page
      setCurrentPage(AthkarData.length - 1);
    }
    localStorage.setItem("CurrentPage", JSON.stringify(currentPage - 1));
  };

  const plus = () => {
    if (count == num[currentPage] - 1) {
      setCount(count);
      setCurrentPage(currentPage + 1);
      setCount(0);
      localStorage.setItem("CurrentPage", JSON.stringify(currentPage));
    } else {
      setCount(count + 1);
    }
  };

  const minus = () => {
    if (count === 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  };

  const Reset = () => {
    setCount(0);
  };

  function AthkarlistOpene() {
    alert("hi form Athkar");
    setDisplay(0);
    localStorage.setItem("statofAthkar", JSON.stringify(0));
  }

  return (
    <>
      {display === 0 ? (
        <>
          <ListItem>
            <ListItemButton onClick={() => AthkarOpen(1)}>
              <Typography
                className="suraname"
                style={{
                  fontFamily: "kitab",
                  fontWeight: "bold",
                  fontSize: 18,
                  marginLeft: 10,
                }}
              >
                ﴿⁠ 1 ﴾
              </Typography>
              <Typography
                // className="suraname"
                style={{ fontFamily: "kitab", fontSize: 20 }}
                // variant="body1"
                align="right"
              >
                أذكار الصباح
              </Typography>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => AthkarOpen(2)}>
              <Typography
                className="suraname"
                style={{
                  fontFamily: "kitab",
                  fontWeight: "bold",
                  fontSize: 18,
                  marginLeft: 10,
                }}
              >
                ﴿⁠ 2 ﴾
              </Typography>
              <Typography
                // className="suraname"
                style={{ fontFamily: "kitab", fontSize: 20 }}
                // variant="body1"
                align="right"
              >
                أذكار المساء
              </Typography>
            </ListItemButton>
          </ListItem>
        </>
      ) : null}

      {display === 1 ? (
        <>
          <CardContent style={{ height: "38vh" }}>
            <Typography
              className="suraname"
              style={{ fontFamily: "kitab", fontSize: 25 }}
            >
              ﴿ {modelTitel} ﴾
            </Typography>
            <Divider
              style={{
                background: "#fbc02d",
                borderBottomWidth: "3px",
                marginBottom: 20,
                marginTop: 10,
              }}
            ></Divider>
            <Typography style={{ fontFamily: "kitab", fontSize: 20 }}>
              {modelContent} {AthkarData[currentPage]}
            </Typography>
          </CardContent>

          <CardContent
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Typography
              style={{
                background: red[800],
                color: "white",
                padding: 5,
                marginTop: 20,
                borderRadius: 50,
                width: "50%",
              }}
            >
              {" "}
              {num[currentPage]} {num[currentPage] <= 1 ? " مرة" : "مرات"}
            </Typography>
            <Typography
              style={{
                background: "black",
                color: "white",
                padding: 5,
                marginTop: 20,
                borderRadius: 50,
                width: "50%",
              }}
            >
              {count + "  " + "المنجز"}
            </Typography>
          </CardContent>
          <Typography
            style={{
              fontSize: 12,
              color: "red",
              marginBottom: 10,
            }}
          >
            سيتم الانتقال تلقائيا للذكر التالي عند اكتمال المرات المنجزة
          </Typography>

          <IconButton
            className="button"
            style={{ background: "black", color: "white", marginLeft: 10 }}
            aria-label="plus"
            onClick={plus}
          >
            <AddIcon />
          </IconButton>

          <IconButton
            className="button"
            style={{ background: "black", color: "white", marginLeft: 10 }}
            aria-label="minus"
            onClick={minus}
          >
            <RemoveIcon />
          </IconButton>

          <IconButton
            className="button"
            style={{ background: "#fbc02d", color: "white", marginLeft: 10 }}
            aria-label="reste"
            onClick={Reset}
          >
            <ReplayIcon />
          </IconButton>

          <Stack
            direction="row"
            spacing={2}
            style={{
              marginTop: 10,
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              style={{ marginLeft: 20 }}
              variant="contained"
              onClick={handleNextPage}
              disabled={currentPage === 27}
            >
              التالي
            </Button>

            <Button
              variant="contained"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              السابق
            </Button>
          </Stack>
        </>
      ) : null}

      {display === 2 ? (
        <>
          <CardContent style={{ padding: 0 }}>
            <Typography
              className="suraname"
              style={{ fontFamily: "kitab", fontSize: 25 }}
            >
              ﴿ {modelTitel} ﴾
            </Typography>
            <Divider
              style={{
                background: "#fbc02d",
                borderBottomWidth: "3px",
                marginBottom: 20,
                marginTop: 10,
              }}
            ></Divider>
            <Typography style={{ fontFamily: "kitab", fontSize: 20 }}>
              {modelContent}
              <Albakara />
            </Typography>
          </CardContent>
        </>
      ) : null}
    </>
  );
}
