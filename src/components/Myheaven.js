import React, { useState, useEffect, useContext, useMemo } from "react";
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
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { Data } from "./Data";
import Myscores from "./Myscores";
import MyItems from "./MyItems.";
import Portfolio from "./Portfolio";
import Slide from "@mui/material/Slide";
import Info from "./Info";
import Alawrad from "./Alawrad";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";

import Quran from "./Quran";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Athkar from "./Athkar";

// ICONS

import OutletIcon from "@mui/icons-material/Outlet";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MosqueIcon from "@mui/icons-material/Mosque";
import StoreIcon from "@mui/icons-material/Store";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import Brightness7SharpIcon from "@mui/icons-material/Brightness7Sharp";
import Brightness2SharpIcon from "@mui/icons-material/Brightness2Sharp";
import ReplayIcon from "@mui/icons-material/Replay";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CircleIcon from "@mui/icons-material/Circle";
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ArticleIcon from "@mui/icons-material/Article";

// Components
import { DataContext } from "../contexts/DataContext";

// DIALOG IMPORTS
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Sound IMPORTS

import done from "../Sounds/done2.mp3";
import notdone from "../Sounds/notdone.mp3";
import bell from "../Sounds/bell.mp3";
import add from "../Sounds/add.mp3";
import reset from "../Sounds/reset.mp3";

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
let statoftask = JSON.parse(localStorage.getItem("statoftask"));
let statofNavgatin = JSON.parse(localStorage.getItem("statofNavgatin"));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let H24 = 24 * 60 * 60 * 1000;
let H20 = 20 * 60 * 60 * 1000;
let M2 = 1 * 60 * 1000;

const Myheaven = ({ activationInterval = H20, theme }) => {
  const [tasks, setTasks] = useState(Data);
  const { score, setScore } = useContext(DataContext);
  const [tree, setTree] = useState(stordtree);
  const [Plam, setPlam] = useState(stordPlam);
  const [Box, setBox] = useState(stordBox);
  const [home, sethome] = useState(stordHome);
  const [castle, setCastle] = useState(stordcastle);
  const [displayedtasksType, setDisplayedtasksType] = useState(
    statoftask === null ? "salat" : statoftask
  );

  const [display, setDisplay] = useState(
    statofNavgatin === null ? 0 : statofNavgatin
  );

  const { showHideToast } = useContext(DataContext);
  const [modelTitel, setmodelTitel] = useState([]);
  const [modelContent, setmodelContent] = useState([]);
  const [modelstate, setmodelstate] = useState(false);
  const [infomodel, setinfomodel] = useState(false);
  const [delet, setdelet] = useState(0);

  const [isActive, setIsActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  /* Get data from localStorage */
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (storageTodos === null) {
      // Use === for comparison, not =
      console.log("empty");
    } else {
      setTasks(storageTodos);
    }
    console.log("Get Data by calling useEffect ");
  }, []);

  /* Athkar Model */
  function AthkarOpen() {
    setDisplay(3);
  }

  /*=== Athkar Model ===*/

  /* Delete score Model */
  function DeletscoreOpene() {
    setdelet(1);
    setmodelstate(true);
    setmodelTitel("حذف و تصفير جميع الأرصدة !!");
    setmodelContent(
      "هل أنت متأكد من حذف  و تصفير جميع الارصدة والبدء من جديد!؟"
    );
  }
  /*=== Delete score Model ===*/

  /* Hadrth Model */
  function hadethOpene(taskId) {
    setdelet(0);
    tasks.map((obj) => (obj.id === taskId ? setmodelContent(obj.hadeth) : obj));
    setmodelstate(true);
    setmodelTitel("الحديث");
  }
  /*=== Hadrth Model ===*/

  /* Hadrth Model */
  function WredOpene(taskId) {
    tasks.map((obj) =>
      obj.id === taskId ? setmodelContent(<Alawrad />) : obj
    );
    setmodelstate(true);
    setmodelTitel(
      "الورد اليومي في الصباح والمساء- (اختر احد الاوراد أو أكثر لتكرارها كل يوم)"
    );
  }
  /*=== Hadrth Model ===*/

  function ModelClose() {
    setmodelstate(false);
    setinfomodel(false);
  }

  /* info Model */
  function infoOpene() {
    setinfomodel(true);
  }

  // Create a Howl instance for the sound effect
  const Done = new Audio(done);
  const Notdone = new Audio(notdone);
  const Add = new Audio(add);
  const Bell = new Audio(bell);
  const resets = new Audio(reset);

  // Function to play the sound effect
  const playSound = (effect) => {
    effect.loop = false;
    effect.play();
  };

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
          playSound(Done);
        } else {
          showHideToast("لا تجعل الشيطان يلهيك", "error");
          playSound(Notdone);
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
    playSound(Add);
  };
  // Counte all points and reset scores
  const updateScoreAndCompleted = () => {
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

  useEffect(() => {
    // Retrieve data from localStorage
    const lastActivation = localStorage.getItem("lastActivation");
    const buttonState = localStorage.getItem("buttonState");

    if (lastActivation && buttonState) {
      const timeSinceLastActivation =
        Date.now() - new Date(lastActivation).getTime();
      if (
        timeSinceLastActivation < activationInterval &&
        buttonState === "inactive"
      ) {
        // Button should still be inactive, calculate time left
        const timeRemaining = activationInterval - timeSinceLastActivation;
        startTimer(timeRemaining);
      }
    }
  }, [activationInterval]);

  const startTimer = (duration) => {
    setIsActive(false);
    setTimeLeft(duration);

    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setIsActive(true);
      localStorage.setItem("lastActivation", new Date().toISOString());
      localStorage.setItem("buttonState", "active");
      playSound(Bell);
    }, duration);
  };

  const handleButtonClick = () => {
    if (isActive) {
      // Perform the test function here
      updateScoreAndCompleted();

      // Disable the button
      setIsActive(false);
      localStorage.setItem("buttonState", "inactive");
      localStorage.setItem("lastActivation", new Date().toISOString());

      // Start the timer for the next activation
      startTimer(activationInterval);
    }
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    return `${hours}:س ${minutes}:د ${seconds}ث`;
  };

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

  const completed = useMemo(() => {
    console.log("calling completed");

    return tasks.filter((t) => {
      return t.isCompleted;
    });
  }, [tasks]);

  const notCompleted = useMemo(() => {
    console.log("calling not completed");

    return tasks.filter((t) => {
      return !t.isCompleted;
    });
  }, [tasks]);

  // Show data for each slide in the Header
  function changeDisplayedType(e) {
    setDisplayedtasksType(e.target.value);
    localStorage.setItem("statoftask", JSON.stringify(e.target.value));
  }

  // Condition for each slide in the Header
  let Alltasks = [];
  if (tasks !== null) {
    switch (displayedtasksType) {
      case "completed":
        Alltasks = completed;
        break;
      case "non-completed":
        Alltasks = notCompleted;
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

  const homePage = (
    <CardContent
      container="true"
      key={1}
      spacing={2}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Myscores
        score={score}
        tree={tree}
        Plam={Plam}
        Box={Box}
        home={home}
        castle={castle}
        Reset={ResetMyScores}
      />

      <Container
        direction="row"
        style={{
          marginTop: 30,
          marginBottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // flexDirection: "column",
        }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            {" "}
            <Typography variant="h3" style={{ fontWeight: "bold" }}>
              جنتي
            </Typography>
            <IconButton
              onClick={infoOpene}
              color="primary"
              aria-label="add to shopping cart"
            >
              <InfoIcon fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            {isActive ? (
              <>
                <Typography
                  style={{
                    // display: "flex",
                    fontSize: 10,
                    fontWeight: "bold",
                    marginBottom: 5,
                    // alignItems: "center",
                  }}
                >
                  وقت جمع الذهب من العبادات المنجزة
                  <strong
                    style={{
                      fontSize: 20,
                      marginRight: 10,
                    }}
                  >
                    😍
                  </strong>
                </Typography>

                <button
                  className="button"
                  onClick={handleButtonClick}
                  variant="contained"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 5,
                    fontWeight: "bold",
                  }}
                >
                  إجمع الذهب
                  <img
                    src={"scores/1.png"}
                    style={{ width: 25, height: 25, marginRight: 10 }}
                    alt="Logo"
                  />
                </button>
              </>
            ) : (
              <>
                <Typography
                  style={{
                    display: "flex",
                    fontSize: 10,
                    alignItems: "center",
                  }}
                >
                  الوقت المتبقي لجمع الذهب
                  <img
                    src={"scores/1.png"}
                    alt="Logo"
                    style={{ width: 20, height: 20, marginRight: 6 }}
                  />
                </Typography>
                <Typography
                  style={{
                    display: "flex",
                    fontSize: 10,
                    // marginBottom: 10,
                    alignItems: "center",
                    // direction: "ltr",
                  }}
                >
                  <img
                    src={"clock.gif"}
                    alt="Logo"
                    style={{ width: 40, height: 40, marginLeft: 2 }}
                  />

                  {formatTime(timeLeft)}
                </Typography>

                <LinearProgress
                  style={{ width: "80%", marginTop: 2 }}
                  variant="determinate"
                  // value={(1 - timeLeft / (activationInterval * 1000)) * 100}
                  value={(timeLeft / activationInterval) * 100}
                />
              </>
            )}
            <Button
              style={{ marginTop: 10, fontSize: 10 }}
              size="small"
              onClick={DeletscoreOpene}
              variant="contained"
              color="error"
            >
              البدء من جديد Reset
            </Button>
          </Grid>
        </Grid>
      </Container>
    </CardContent>
  );
  const tabs = (
    <ToggleButtonGroup
      key={2}
      style={{ direction: "ltr", marginTop: "0px" }}
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
      key={3}
      style={{
        // marginTop: 0,
        maxHeight: "59vh",
        // maxWidth: "60.5vh",
        // background: "green",

        overflow: "scroll",
      }}
      sx={{
        minWidth: 380,
      }}
    >
      {Alltasks.map((task) => (
        <Card
          key={task.id}
          container="true"
          className="todoCard"
          sx={{
            background: theme.palette.mode === "dark" ? "#263238" : "#263238",
            // color: "white",
            marginTop: 1,
          }}
        >
          <Grid container="true" spacing={2}>
            <Grid
              xs={7}
              display="flex"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              color="#fff"
            >
              <Typography style={{ fontSize: 14 }}>
                {task.titel}
                {/* Wred ICON BUTTON */}
                {task.werd ? (
                  <IconButton
                    onClick={() => WredOpene(task.id)}
                    className="iconButton"
                    aria-label="delete"
                    style={{
                      color: "white",
                    }}
                  >
                    <MenuBookIcon sx={{ color: "#00a152", fontSize: 30 }} />
                  </IconButton>
                ) : null}
                {/*== Wred ICON BUTTON ==*/}
                {/* {task.quran ? (
                  <IconButton
                    onClick={() => quranOpene()}
                    className="iconButton"
                    aria-label="delete"
                    style={{
                      color: "white",
                    }}
                  >
                    <MenuBookIcon sx={{ color: "#00a152", fontSize: 30 }} />
                  </IconButton>
                ) : null} */}
                {/* {task.tfser ? (
                  <IconButton
                    onClick={() => TafseerOpen()}
                    className="iconButton"
                    aria-label="delete"
                    style={{
                      color: "white",
                    }}
                  >
                    <ReceiptIcon sx={{ color: "#d500f9", fontSize: 30 }} />
                  </IconButton>
                ) : null} */}

                {/* Athkar ICON BUTTON */}
                {task.Athkar ? (
                  <IconButton
                    onClick={() => AthkarOpen()}
                    className="iconButton"
                    aria-label="delete"
                    style={{
                      color: "white",
                    }}
                  >
                    <Brightness7SharpIcon
                      sx={{ color: "#fbc02d", fontSize: 30 }}
                    />
                  </IconButton>
                ) : null}
                {/*== Athkar ICON BUTTON ==*/}

                {/* Athkar ICON BUTTON */}
                {task.Athkar === false ? (
                  <IconButton
                    onClick={() => AthkarOpen()}
                    className="iconButton"
                    aria-label="delete"
                    style={{
                      color: "white",
                    }}
                  >
                    <Brightness2SharpIcon
                      sx={{ color: "#fbc02d", fontSize: 30 }}
                    />
                  </IconButton>
                ) : null}
                {/*== Athkar ICON BUTTON ==*/}
              </Typography>
            </Grid>

            {/* ACTION BUTTONS */}
            <Grid
              xs={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {/* hadeth ICON BUTTON */}
              {task.hadeth ? (
                <IconButton
                  onClick={() => hadethOpene(task.id)}
                  className="iconButton"
                  aria-label="delete"
                  style={{
                    color: "white",
                    paddingRight: 25,
                  }}
                >
                  <SpeakerNotesIcon sx={{ color: "#0288d1", fontSize: 30 }} />
                </IconButton>
              ) : null}
              {/*== hadeth ICON BUTTON ==*/}

              {/* Points info  */}
              <Stack direction="row" container="true" spacing={1}>
                <Chip
                  label={task.points}
                  style={{
                    // background: "#fbc02d",
                    color: "white",
                    fontSize: "18px",
                    fontFamily: "BakbakOne",
                  }}
                />
                {/* Points icons  */}
                {task.gold ? (
                  <Avatar
                    alt="Remy Sharp"
                    src="scores/1.png"
                    sx={{ width: 32, height: 32 }}
                  />
                ) : null}
                {task.tree ? (
                  <Avatar
                    alt="Remy Sharp"
                    src="scores/2.png"
                    sx={{ width: 30, height: 30 }}
                  />
                ) : null}
                {task.Palm ? (
                  <Avatar
                    alt="Remy Sharp"
                    src="scores/3.png"
                    sx={{ width: 30, height: 30 }}
                  />
                ) : null}
                {task.Box ? (
                  <Avatar
                    alt="Remy Sharp"
                    src="scores/4.png"
                    sx={{ width: 30, height: 30 }}
                  />
                ) : null}
                {task.home ? (
                  <Avatar
                    alt="Remy Sharp"
                    src="scores/5.png"
                    sx={{ width: 30, height: 30 }}
                  />
                ) : null}
                {task.castle ? (
                  <Avatar
                    alt="Remy Sharp"
                    src="scores/6.png"
                    sx={{ width: 30, height: 30 }}
                  />
                ) : null}
                {/*== Points icons == */}
              </Stack>
              {/* ==Points info==  */}

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
                  <Brightness1OutlinedIcon sx={{ fontSize: 30 }} />
                )}
              </IconButton>
              {/*== CHECK ICON BUTTON ==*/}
            </Grid>
            {/*== ACTION BUTTONS ==*/}
          </Grid>
        </Card>
      ))}
    </Card>
  );

  // function quranOpene() {
  //   setDisplay(2);
  //   localStorage.setItem("statofNavgatin", JSON.stringify(2));
  // }

  // function TafseerOpen() {
  //   setDisplay(2);
  //   localStorage.setItem("statofNavgatin", JSON.stringify(2));
  // }

  function ResetMyScores() {
    setScore(0);
    setTree(0);
    setPlam(0);
    setBox(0);
    sethome(0);
    setCastle(0);
    setmodelstate(false);
    setIsActive(true);
    localStorage.removeItem("todos");

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
    playSound(resets);
  }
  // console.log(display);
  return (
    <Card
      style={{
        width: 450,
        // background: "green",
        height: "100vh",
        borderRadius: "20px",
      }}
      sx={{ minWidth: 250 }}
    >
      {/* ==== FILTER BUTTON ==== */}
      {display === 0 ? (
        [homePage, tabs, Lists]
      ) : display === 1 ? (
        <MyItems
          score={score}
          tree={tree}
          Plam={Plam}
          Box={Box}
          home={home}
          castle={castle}
        />
      ) : display === 2 ? (
        <Quran />
      ) : display === 3 ? (
        <Athkar />
      ) : display === 4 ? (
        <Portfolio />
      ) : null}

      {/* info DIALOG */}
      <Dialog
        className="Dialog"
        // maxWidth="md"
        // onClose={AthkarClose}
        style={{ direction: "rtl" }}
        open={modelstate}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{modelTitel}</DialogTitle>
        <DialogContent dividers>
          <DialogContent style={{ padding: 0 }}>
            <DialogContentText
              display="flex"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              id="alert-dialog-slide-description"
            >
              <Grid>
                <Grid item="true" xs={8}>
                  <Typography style={{ fontSize: 15 }}>
                    {modelContent}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
        </DialogContent>

        <DialogActions style={{ direction: "ltr" }}>
          {delet === 1 ? (
            <Button color="error" variant="contained" onClick={ResetMyScores}>
              نعم
            </Button>
          ) : null}

          <Button variant="contained" onClick={ModelClose}>
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
      {/* === info DIALOG === */}

      {/* info DIALOG */}
      <Dialog
        // maxWidth="md"
        className="Dialog"
        // onClose={infoModelClose}
        style={{ direction: "rtl" }}
        open={infomodel}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>شرح استخدام التطبيق </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Info />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ModelClose}>إغلاق</Button>
        </DialogActions>
      </Dialog>
      {/* === info DIALOG === */}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={display}
          onChange={(event, newValue) => {
            setDisplay(newValue);
            localStorage.setItem("statofNavgatin", JSON.stringify(newValue));
          }}
        >
          <BottomNavigationAction label=" العبادات" icon={<MosqueIcon />} />
          <BottomNavigationAction label="شراء الجوائز" icon={<StoreIcon />} />
          <BottomNavigationAction
            label=" القرآن و التفسير"
            icon={<MenuBookIcon />}
          />
          <BottomNavigationAction label=" الأذكار" icon={<ArticleIcon />} />
          <BottomNavigationAction label="عن المطور" icon={<InfoIcon />} />
        </BottomNavigation>
      </Paper>
    </Card>
  );
};

export default Myheaven;
