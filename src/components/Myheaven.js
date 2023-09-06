import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import { green } from "@mui/material/colors";
import Chip from "@mui/material/Chip";
import { Data } from "./Data";
import Myscores from "./Myscores";
import MyItems from "./MyItems.";
import Portfolio from "./Portfolio";
import { AthkarAlsbah } from "./Data";
import { AthkarAlmsaa } from "./Data";
import Slide from "@mui/material/Slide";

// ICONS

import OutletIcon from "@mui/icons-material/Outlet";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MosqueIcon from "@mui/icons-material/Mosque";
import StoreIcon from "@mui/icons-material/Store";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";

// Components
import { DataContext } from "../contexts/DataContext";

// DIALOG IMPORTS
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// let storageTodos = [];
let stordtree = 0;
let stordPlam = 0;
let stordBox = 0;
let stordHome = 0;
let stordcastle = 0;
// Get data score from local storage
// storageTodos = JSON.parse(localStorage.getItem("tasks"));
stordtree = JSON.parse(localStorage.getItem("tree"));
stordPlam = JSON.parse(localStorage.getItem("plam"));
stordBox = JSON.parse(localStorage.getItem("Box"));
stordHome = JSON.parse(localStorage.getItem("home"));
stordcastle = JSON.parse(localStorage.getItem("castle"));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Myheaven = () => {
  const [tasks, setTasks] = useState(Data);
  const { score, setScore } = useContext(DataContext);
  const [tree, setTree] = useState(stordtree);
  const [Plam, setPlam] = useState(stordPlam);
  const [Box, setBox] = useState(stordBox);
  const [home, sethome] = useState(stordHome);
  const [castle, setCastle] = useState(stordcastle);
  const [displayedtasksType, setDisplayedtasksType] = useState("salat");
  const [display, setDisplay] = useState("mytasks");
  const { showHideToast } = useContext(DataContext);
  const [hadethModel, sethadethModel] = useState(false);
  const [Showhadeth, setShowhadeth] = useState([]);
  const [AthkarTitel, setAthkarTitel] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [AthkarModel, setAthkarModel] = useState(false);
  const [AthkarData, setAthkarData] = useState([]);

  const Alsbah = AthkarAlsbah.map((item, index) => `(${index + 1})- ${item}`);
  const Almsaa = AthkarAlmsaa.map((item, index) => `(${index + 1})- ${item}`);
  // console.log(Alsbah);

  /* Get data from localStorage */
  useEffect(() => {
    console.log("Get Data by calling useEffect ");
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (storageTodos === null) {
      // Use === for comparison, not =
      console.log("empty");
    } else {
      setTasks(storageTodos);
    }
  }, []);

  console.log(Data);

  /* Athkar Model */
  function AthkarOpen(time) {
    if (time === true) {
      setAthkarTitel("أذكار الصباح");
      setAthkarData(Alsbah);
      setAthkarModel(true);
      setCurrentPage(0);
    } else {
      setAthkarTitel("أذكار المساء");
      setAthkarData(Almsaa);
      setAthkarModel(true);
      setCurrentPage(0);
    }
  }

  function AthkarClose() {
    setAthkarModel(false);
  }

  const handleNextPage = () => {
    if (currentPage < AthkarData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // If we reach the end, loop back to the first page
      setCurrentPage(0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      // If we are on the first page, go to the last page
      setCurrentPage(AthkarData.length - 1);
    }
  };
  /*=== Athkar Model ===*/

  /* Hadrth Model */
  function hadethOpene(taskId) {
    tasks.map((obj) => (obj.id === taskId ? setShowhadeth(obj.hadeth) : obj));
    sethadethModel(true);
  }

  function hadethClose() {
    sethadethModel(false);
  }
  /*=== Hadrth Model ===*/

  // Change tasks to completed
  const completeTask = (taskId) => {
    // Ensure tasks is initialized and not null
    if (tasks === null) {
      tasks = []; // Initialize tasks as an empty array if it's null
    }
    const updatedTasks = tasks.map((obj) => {
      if (obj.id === taskId) {
        const newIsCompleted = !obj.isCompleted;

        setTasks((prevTasks) => {
          const updatedRows = prevTasks.map((prevObj) =>
            prevObj.id === taskId
              ? { ...prevObj, isCompleted: newIsCompleted }
              : prevObj
          );
          localStorage.setItem("todos", JSON.stringify(updatedRows));

          return updatedRows;
        });
        if (newIsCompleted) {
          showHideToast("الحمد لله..اللهم تقبل يارب", "success"); // Call function when isCompleted becomes true
        } else {
          showHideToast("لا تجعل الشيطان يلهيك", "error");
        }
      }

      return obj;
    });
  };

  const counter = (taskId) => {
    tasks.map((obj) =>
      obj.id === taskId && obj.Palm
        ? setPlam((prevScore) => prevScore + obj.points)
        : obj
    );
    tasks.map((obj) =>
      obj.id === taskId && obj.tree
        ? setTree((prevScore) => prevScore + obj.points)
        : obj
    );
    tasks.map((obj) =>
      obj.id === taskId && obj.home
        ? sethome((prevScore) => prevScore + obj.points)
        : obj
    );
    tasks.map((obj) =>
      obj.id === taskId && obj.Box
        ? setBox((prevScore) => prevScore + obj.points)
        : obj
    );
    tasks.map((obj) =>
      obj.id === taskId && obj.castle
        ? setCastle((prevScore) => prevScore + obj.points)
        : obj
    );
  };
  // Counte all points and reset scores
  useEffect(() => {
    const updateScoreAndCompleted = () => {
      // Check if tasks is null or undefined and handle it accordingly
      if (tasks === null || tasks === undefined) {
        return;
      }

      const scoreUpdates = {
        scoretree: setScore,
        // tree: setTree,
        // Palm: setPalm, // Typo: Should be setPalm
        // Box: setBox,
        home: sethome, // Typo: Should be setHome
        castle: setCastle,
      };

      const updatedTasks = tasks.map((obj) => {
        if (obj.isCompleted === true) {
          if (obj.points >= 20) {
            setScore((prevScore) => prevScore + obj.points);
          }

          for (const prop in scoreUpdates) {
            if (obj[prop] === true) {
              scoreUpdates[prop]((prevScore) => prevScore + obj.points);
            }
          }

          return { ...obj, isCompleted: false };
        }
        return obj;
      });

      setTasks(updatedTasks);
      localStorage.setItem("todos", JSON.stringify(updatedTasks));
    };

    const currentDate = new Date();
    const targetTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      6, // Set the hours to 6 for 06:00 AM
      0, // Minutes
      0 // Seconds
    );

    // Calculate the time until the next 06:00 AM
    if (currentDate > targetTime) {
      // If it's already past 06:00 AM today, schedule for 06:00 AM tomorrow
      targetTime.setDate(targetTime.getDate() + 1);
    }

    // eslint-disable-next-line no-unused-vars
    const timeUntilTarget = targetTime - currentDate;
    const interval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const timer = setTimeout(() => {
      updateScoreAndCompleted();
      setInterval(updateScoreAndCompleted, interval);
    }, timeUntilTarget);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [setScore, tasks]);

  // Save score on local storage
  const stateMappings = [
    { state: score, key: "score" },
    { state: tree, key: "tree" },
    { state: Plam, key: "plam" },
    { state: Box, key: "Box" },
    { state: home, key: "home" },
    { state: castle, key: "castle" },
  ];

  stateMappings.forEach((mapping) => {
    localStorage.setItem(mapping.key, JSON.stringify(mapping.state));
  });

  // filter all non completed tasks
  const nonCompleted = () => {
    const incompleteObjects = [];
    for (const obj of tasks) {
      if (!obj.isCompleted) {
        incompleteObjects.push(obj);
      }
    }

    return incompleteObjects;
  };

  // filter all completed tasks
  const Completed = () => {
    const completeObjects = [];

    for (const obj of tasks) {
      if (obj.isCompleted === true) {
        completeObjects.push(obj);
      }
    }

    return completeObjects;
  };

  // Show data for each slide in the Header
  function changeDisplayedType(e) {
    setDisplayedtasksType(e.target.value);
  }

  // Condition for each slide in the Header
  let Alltasks = [];
  if (tasks !== null) {
    switch (displayedtasksType) {
      case "completed":
        Alltasks = Completed();
        break;
      case "non-completed":
        Alltasks = nonCompleted();
        break;
      case "salat":
        Alltasks = tasks.slice(0, 5);
        break;
      case "Qran":
        Alltasks = tasks.slice(5, 11);
        break;
      case "Athkar":
        Alltasks = tasks.slice(11, 19);
        break;
      case "Nwafel":
        Alltasks = tasks.slice(19, 27);
        break;
      default:
        Alltasks = [];
    }
  }

  // console.log(Alltasks);
  // Show data for each slide in the Header
  function changeDisplay(e) {
    setDisplay(e.target.value);
  }

  const tabs = (
    <ToggleButtonGroup
      style={{ direction: "ltr", marginTop: "15px" }}
      value={displayedtasksType}
      exclusive
      color="primary"
      onChange={changeDisplayedType}
      aria-label="text alignment"
      size="small"
    >
      <ToggleButton value="non-completed">غير منجز</ToggleButton>
      <ToggleButton value="completed">المنجز</ToggleButton>
      <ToggleButton value="Nwafel">النوافل والاحسان</ToggleButton>
      <ToggleButton value="Athkar"> الأذكار</ToggleButton>
      <ToggleButton value="Qran">القران</ToggleButton>
      <ToggleButton value="salat">الصلاة</ToggleButton>
    </ToggleButtonGroup>
  );

  const Lists = (
    <Card
      maxWidth="sm"
      style={{
        // marginTop: 0,
        maxHeight: "60.5vh",
        // maxWidth: "60.5vh",
        // background: "green",

        overflow: "scroll",
      }}
      sx={{
        minWidth: 380,
        // width: "100%"
        marginTop: 1,
      }}
    >
      {Alltasks.map((task) => (
        <Card
          container
          className="todoCard"
          sx={{
            background: "#212121",
            // color: "white",
            marginTop: 1,
          }}
        >
          <Grid container spacing={2}>
            <Grid xs={7}>
              <Typography
                style={{ fontSize: 15 }}
                sx={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                }}
              >
                {task.titel}

                {/* Athkar ICON BUTTON */}
                {task.Athkar ? (
                  <IconButton
                    onClick={() => AthkarOpen(true)}
                    className="iconButton"
                    aria-label="delete"
                    style={{
                      color: "white",
                    }}
                  >
                    <SpeakerNotesIcon sx={{ color: "#0288d1", fontSize: 30 }} />
                  </IconButton>
                ) : null}
                {/*== Athkar ICON BUTTON ==*/}

                {/* Athkar ICON BUTTON */}
                {task.Athkar === false ? (
                  <IconButton
                    onClick={() => AthkarOpen(false)}
                    className="iconButton"
                    aria-label="delete"
                    style={{
                      color: "white",
                    }}
                  >
                    <SpeakerNotesIcon sx={{ color: "#0288d1", fontSize: 30 }} />
                  </IconButton>
                ) : null}
                {/*== Athkar ICON BUTTON ==*/}
              </Typography>
            </Grid>

            {/* ACTION BUTTONS */}
            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* info ICON BUTTON */}
              {task.hadeth ? (
                <IconButton
                  onClick={() => hadethOpene(task.id)}
                  className="iconButton"
                  aria-label="delete"
                  style={{
                    color: "white",
                  }}
                >
                  <InfoIcon sx={{ color: "#0288d1", fontSize: 30 }} />
                </IconButton>
              ) : null}
              {/*== info ICON BUTTON ==*/}

              {/* Points info  */}
              <Stack direction="row" container spacing={2}>
                <Chip
                  label={task.points + " " + task.detils}
                  style={{ background: "#fbc02d", fontSize: "11px" }}
                />
              </Stack>
              {/* ==Points info==  */}

              {/* CHECK ICON BUTTON */}
              <IconButton
                onClick={() => completeTask(task.id)}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "white",
                  // border: "solid #8bc34a 3px",
                }}
              >
                {task.isCompleted ? (
                  <CheckCircleIcon sx={{ color: green[500], fontSize: 30 }} />
                ) : task.counter ? null : (
                  <OutletIcon sx={{ fontSize: 30 }} />
                )}
              </IconButton>
              {/*== CHECK ICON BUTTON ==*/}

              {/* Counte ICON BUTTON */}
              <IconButton
                onClick={() => counter(task.id)}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "white",
                  // border: "solid #8bc34a 3px",
                }}
              >
                {task.counter === true ? (
                  <AddReactionIcon sx={{ color: "#fbc02d", fontSize: 30 }} />
                ) : null}
              </IconButton>
              {/*== Counte ICON BUTTON ==*/}
            </Grid>
            {/*== ACTION BUTTONS ==*/}
          </Grid>
        </Card>
      ))}
    </Card>
  );

  const Items = <MyItems />;

  const Appinfo = <Portfolio />;

  // Condition for each slide in the Header
  let BottomNavigationData = [];

  switch (display) {
    case "mytasks":
      BottomNavigationData = [tabs, Lists];
      break;
    case "presnt":
      BottomNavigationData = Items;
      break;
    case "app-info":
      BottomNavigationData = Appinfo;
      break;
    default:
      BottomNavigationData = [];
  }

  return (
    <Card
      maxWidth="sm"
      style={{
        width: 450,
        // background: "green",
        height: "100vh",
        borderRadius: "20px",
      }}
      sx={{ minWidth: 250 }}
    >
      <CardContent
        container
        maxWidth="sm"
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* Avatar */}
        <Myscores
          score={score}
          tree={tree}
          Plam={Plam}
          Box={Box}
          home={home}
          castle={castle}
        />
        {/* == Avatar == */}
        {/* HEADER */}
        <Typography
          variant="h3"
          style={{ fontWeight: "bold", marginTop: "20px" }}
        >
          جنتي
        </Typography>
        {/* ==HEADER== */}
        <Divider style={{ marginTop: "20px", color: "#5456454" }} />
        {/* FILTER BUTTONS */}
        {BottomNavigationData}
        {/* ==== FILTER BUTTON ==== */}
        {/* ALL TODOS */}
        {/* === ALL TODOS === */}
        {/* FILTER BUTTONS */}

        <ToggleButtonGroup
          sx={{
            position: "fixed",
            bottom: 0,
          }}
          elevation={3}
          style={{
            direction: "ltr",
            marginTop: "20px",
            background: "white ",
          }}
          value={display}
          exclusive
          color="primary"
          onChange={changeDisplay}
          aria-label="text alignment"
          size="small"
        >
          <ToggleButton value="app-info">
            <InfoIcon />
            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 2 }} />
            عن التطبيق
          </ToggleButton>
          <ToggleButton value="presnt">
            <StoreIcon />
            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 2 }} />
            شراء الجوائز
          </ToggleButton>
          <ToggleButton value="mytasks">
            <MosqueIcon />
            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 2 }} />
            العبادات
          </ToggleButton>
        </ToggleButtonGroup>

        {/* ==== FILTER BUTTON ==== */}

        {/* info DIALOG */}
        <Dialog
          className="Dialog"
          onClose={hadethClose}
          style={{ direction: "rtl" }}
          open={hadethModel}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>معلومة</DialogTitle>
          <DialogContent dividers>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {Showhadeth}
              </DialogContentText>
            </DialogContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={hadethClose}>إغلاق</Button>
          </DialogActions>
        </Dialog>
        {/* === info DIALOG === */}

        {/* Athkar DIALOG */}
        <Dialog
          className="Dialog"
          // onClose={AthkarClose}
          style={{ direction: "rtl" }}
          open={AthkarModel}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>{AthkarTitel}</DialogTitle>
          <DialogContent dividers>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <Typography>{AthkarData[currentPage]}</Typography>
              </DialogContentText>
            </DialogContent>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleNextPage}
              disabled={currentPage === 27}
            >
              التالي
            </Button>
            <DialogContent dividers>
              <Button
                variant="contained"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
              >
                السابق
              </Button>
            </DialogContent>

            <Button variant="contained" onClick={AthkarClose}>
              إغلاق
            </Button>
          </DialogActions>
        </Dialog>
        {/* === Athkar DIALOG === */}
      </CardContent>
    </Card>
  );
};

export default Myheaven;
