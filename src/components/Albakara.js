import React, { useState, useEffect, useContext, useMemo } from "react";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import { green } from "@mui/material/colors";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import { Tabel } from "./Tabel";
import Card from "@mui/material/Card";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// ICONS

import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";

// Components
import { DataContext } from "../contexts/DataContext";

// DIALOG IMPORTS

// Sound IMPORTS

import done from "../Sounds/done2.mp3";
import notdone from "../Sounds/notdone.mp3";


// Get data score from local storage
// storageTodos = JSON.parse(localStorage.getItem("tasks"));
let statoftask = JSON.parse(localStorage.getItem("statoftask"));
// let AyaStates = JSON.parse(localStorage.getItem("AyaStates"));



const STORAGE_KEY = "selectedOptions";

const Albakara = () => {

  const [datatabel, setDatatabel] = useState(Tabel);




  function updateLocalStorageIfNeeded() {
    const storedTabel = JSON.parse(localStorage.getItem('selectedOptions'));

    if (!storedTabel || JSON.stringify(storedTabel) !== JSON.stringify(datatabel)) {
      localStorage.setItem('selectedOptions', JSON.stringify(datatabel));
      console.log("Updated Tabel array in local storage.");
    } else {
      console.log("Tabel array in local storage is already up to date.");
    }
  }



  useEffect(() => {
    const savedOptions = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedOptions) {
      setDatatabel(savedOptions);
    }
  }, []);

  const handleSelectChange = (event, taskId) => {
    const { value } = event.target;
    const updatedData = datatabel.map(task => {
      if (task.id === taskId) {
        return { ...task, selectedOption: value };
      }
      return task;
    });

    setDatatabel(updatedData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));

  };



  const [displayedtasksType, setDisplayedtasksType] = useState(
    statoftask === null ? "salat" : statoftask
  );

  const { showHideToast } = useContext(DataContext);
  const theme = useTheme();

  /* Get data from localStorage */
  useEffect(() => {
    const storageCompleteTask = JSON.parse(localStorage.getItem("completeTask"));
    if (storageCompleteTask === null) {
      // Use === for comparison, not =
    } else {
      setDatatabel(storageCompleteTask);
    }
  }, []);


  // Create a Howl instance for the sound effect
  const Done = new Audio(done);
  const Notdone = new Audio(notdone);


  // Function to play the sound effect
  const playSound = (effect) => {
    effect.loop = false;
    effect.play();
  };

  // Change tasks to completed
  const completeTask = (taskId) => {
    // Ensure tasks is initialized and not null
    if (datatabel === null) {
      datatabel = []; // Initialize tasks as an empty array if it's null
    }
    const updatedTasks = datatabel.map((obj) => {
      if (obj.id === taskId) {
        const newIsCompleted = !obj.isCompleted;

        setDatatabel((prevTasks) => {
          const updatedRows = prevTasks.map((prevObj) =>
            prevObj.id === taskId
              ? { ...prevObj, isCompleted: newIsCompleted }
              : prevObj
          );
          localStorage.setItem("completeTask", JSON.stringify(updatedRows));

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

  // filter all non completed tasks
  const completed = useMemo(() => {
    return datatabel.filter((t) => {
      return t.isCompleted;
    });
  }, [datatabel]);

  const notCompleted = useMemo(() => {
    return datatabel.filter((t) => {
      return !t.isCompleted;
    });
  }, [datatabel]);

  // Show data for each slide in the Header
  function changeDisplayedType(e) {
    setDisplayedtasksType(e.target.value);
    localStorage.setItem("statoftask", JSON.stringify(e.target.value));
  }

  // Condition for each slide in the Header
  let Alltasks = [];
  if (datatabel !== null) {
    switch (displayedtasksType) {
      case "completed":
        Alltasks = completed;
        break;
      case "non-completed":
        Alltasks = notCompleted;
        break;
      case "salat":
        Alltasks = datatabel;
        break;
      default:
        Alltasks = [];
    }
  }


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
      <ToggleButton value="salat">الجدول</ToggleButton>
    </ToggleButtonGroup>
  );

  const Lists = (
    <Card
      key={3}
      style={{
        // marginTop: 0,
        maxHeight: "97vh",
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
              xs={3}
              display="flex"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              color="#fff"
            >
              <Typography style={{ fontSize: 14 }}>
                {task.titel}
              </Typography>
            </Grid>

            <Grid
              xs={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {/* num    */}
              <Stack direction="row" container="true" spacing={1}>
              <Chip
                label={task.num}
                style={{
                  // background: "#fbc02d",
                  color: "white",
                  fontSize: task.num === "مراجعة السابق" ? "15px" :"20px",
                  fontFamily: "BakbakOne",
                  fontWeight: "bold"
                }}
            />

              </Stack>

              {/* == num  ==  */}

            </Grid>

            <Grid
              xs={6}
              display="flex"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              color="#fff"
            >

            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
            <InputLabel style={{color : "white" }} id={`select-label-${task.id}`}>اختبر نفسك</InputLabel>
            <Select
              style={{color : task.selectedOption === "good" ? "green" : "#e53935"}}
              labelId={`select-label-${task.id}`}
              id={`select-${task.id}`}
              value={task.selectedOption || ""}
              onChange={(e) => handleSelectChange(e, task.id)}
            >
              <MenuItem  style={{color : "green" }}  value="good">{task.good}</MenuItem>
              <MenuItem  style={{color : "#e53935" }} value="bad">{task.bad}</MenuItem>
            </Select>
          </FormControl>
            </Box>

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

            {/* ACTION BUTTONS */}
            {/* <Grid
              xs={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >


            </Grid> */}
            {/*== ACTION BUTTONS ==*/}

          </Grid>
        </Card>
      ))}
    </Card>
  );

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
      {tabs}
      {Lists}
    </Card>
  );
};

export default Albakara;
