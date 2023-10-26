import React, { useState, useEffect } from "react";
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
import Prayer from "./Prayer";

import { Countrys } from "./CountryData";
// import { Citis } from "./CountryData";

// icons
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import LightModeIcon from "@mui/icons-material/LightMode";

// DIALOG IMPORTS
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import cash from "../Sounds/cash.mp3";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

// Prayer
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import moment from "moment";
import { useForkRef } from "@mui/material";
import "moment/dist/locale/ar-dz";
moment.locale("ar");

let statofcountry = JSON.parse(localStorage.getItem("statofcountry"));
let statofcity = JSON.parse(localStorage.getItem("statofcity"));

export default function Prayertime() {
  // STATES
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);

  const [timings, setTimings] = useState({
    Sunris: "07:20",
    Fajr: "04:20",
    Dhuhr: "11:50",
    Asr: "15:18",
    Sunset: "18:03",
    Isha: "19:33",
  });

  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Sunset", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  const [remainingTime, setRemainingTime] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(
    statofcountry === null ? "" : statofcountry
  );
  const [selectedCity, setSelectedCity] = useState(
    statofcity === null || undefined ? "اختر موقعك" : statofcity
  );
  const [today, setToday] = useState("");

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    localStorage.setItem("statofcountry", JSON.stringify(event.target.value));
  };

  const handleCityChange = (event) => {
    const selectedCityName = event.target.value;
    const selectedCountry = Countrys.find((country) => {
      return country.cities.some((city) => city.name === selectedCityName);
    });

    if (selectedCountry) {
      const selectedCity = selectedCountry.cities.find(
        (city) => city.name === selectedCityName
      );
      setSelectedCity(selectedCityName);
      localStorage.setItem("statofcity", JSON.stringify(selectedCityName));
    }
  };

  // Function to add minutes to a given time string
  const addMinutes = (timeString, minutes) => {
    const [hours, mins] = timeString.split(":").map(Number);
    const newDate = new Date(0, 0, 0, hours, mins);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    const newHours = newDate.getHours().toString().padStart(2, "0");
    const newMinutes = newDate.getMinutes().toString().padStart(2, "0");
    return `${newHours}:${newMinutes}`;
  };

  const getTimings = async () => {
    // console.log("calling the api");
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=${selectedCountry}&city=${selectedCity}`
    );

    const timings = response.data.data.timings;
    const updatedTimings = { ...timings };
    // Add minutes to specific prayer timings
    updatedTimings.Sunrise = addMinutes(timings.Sunrise, 0);
    updatedTimings.Fajr = addMinutes(timings.Fajr, 30);
    updatedTimings.Dhuhr = addMinutes(timings.Dhuhr, 5);
    updatedTimings.Asr = addMinutes(timings.Asr, -2);
    updatedTimings.Sunset = addMinutes(timings.Sunset, 3);
    updatedTimings.Isha = addMinutes(timings.Isha, -57);
    setTimings(timings);
  };

  useEffect(() => {
    getTimings();
  }, [selectedCity]);

  useEffect(() => {
    let interval = setInterval(() => {
      // console.log("calling timer");
      setupCountdownTimer();
    }, 1000);

    const t = moment();
    setToday(t.format("Do MMMM YYYY | HH:mm a"));

    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  // const data = await axios.get(
  // 	"https://api.aladhan.com/v1/timingsByCity?country=SA&city=Riyadh"
  // );

  const setupCountdownTimer = () => {
    const momentNow = moment();

    let prayerIndex = 2;

    if (
      momentNow.isAfter(moment(timings["Fajr"], "HH:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "HH:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "HH:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "HH:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "HH:mm")) &&
      momentNow.isBefore(moment(timings["Sunset"], "HH:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Sunset"], "HH:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "HH:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }
    // console.log("Imag:", Imag);
    setNextPrayerIndex(prayerIndex);

    // now after knowing what the next prayer is, we can set up the countdown timer by getting the prayer's time
    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "HH:mm");

    let remainingTime = moment(nextPrayerTime, "HH:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "HH:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "HH:mm:ss")
      );

      const totalDifference = midnightDiff + fajrToMidnightDiff;

      remainingTime = totalDifference;
    }

    const durationRemainingTime = moment.duration(remainingTime);

    const formattedRemainingTime = `${formatNumber(
      durationRemainingTime.hours()
    )}:${formatNumber(durationRemainingTime.minutes())}:${formatNumber(
      durationRemainingTime.seconds()
    )}`;

    setRemainingTime(formattedRemainingTime);
  };

  // Helper function to format a number as a two-digit string with leading zeros
  function formatNumber(num) {
    return num.toString().padStart(2, "0");
  }

  const Imag = [
    { location: "Sunmod/1.png" },
    { location: "Sunmod/2.png" },
    { location: "Sunmod/3.png" },
    { location: "Sunmod/4.png" },
    { location: "Sunmod/5.png" },
    { location: "Sunmod/6.png" },
  ];

  const SalatTime = [
    { time: moment(timings.Fajr, "HH:mm").format("HH:mm a") },
    { time: moment(timings.Sunris, "HH:mm").format("HH:mm a") },
    { time: moment(timings.Dhuhr, "HH:mm").format("HH:mm a") },
    { time: moment(timings.Asr, "HH:mm").format("HH:mm a") },
    { time: moment(timings.Sunset, "HH:mm").format("HH:mm a") },
    { time: moment(timings.Isha, "HH:mm").format("HH:mm a") },
  ];

  const theme = useTheme();
  let ms;
  let modetext;

  theme.palette.mode === "dark" ? (ms = "Card-dark") : (ms = "Card-light");
  theme.palette.mode === "dark"
    ? (modetext = " الضوء الفاتح")
    : (modetext = "الضوء الليلي");

  let timeNow = nextPrayerIndex - 1;
  return (
    <Container
    // maxWidth="sm"
    >
      <Box sx={{ width: "100%" }}>
        <Grid
          // spacing={1}
          container
          style={{
            // marginTop: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            marginTop: 1,
          }}
        >
          <Grid className={ms} item="true" xs={12} style={{ marginTop: 5 }}>
            <Card
              style={{
                borderRadius: "20px",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                paddingLeft: 5,
              }}
            >
              <Grid xs={2} item="true">
                <Darkmode style={{ width: 20, height: 20 }} />
                <Typography
                  gutterBottom
                  color="primary"
                  style={{
                    fontFamily: "BakbakOne",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  {modetext}
                </Typography>
              </Grid>
              <Grid
                item="true"
                xs={12}
                style={{ borderRadius: "10px", marginTop: 10 }}
              >
                <Typography
                  style={{
                    fontSize: 20,
                    color: "#fbc02d",
                    marginTop: 10,
                    direction: "rtl",
                  }}
                  gutterBottom
                >
                  {today}
                </Typography>
                <Typography
                  style={{
                    color: "#fbc02d",
                    fontSize: 28,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  gutterBottom
                >
                  {selectedCity}
                  {/* {console.log(selectedCity.name)} */}
                  <LocationOnIcon style={{ width: 35, height: 35 }} />
                </Typography>
              </Grid>
            </Card>
          </Grid>
          <Grid style={{ marginTop: 20, marginBottom: 20 }} item="true" xs={12}>
            <Stack direction="row" justifyContent={"center"}>
              {/* SELECT country */}

              <FormControl
                variant="standard"
                className={ms}
                sx={{ m: 1, minWidth: 180 }}
              >
                <InputLabel id="demo-simple-select-filled-label">
                  البلد
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                >
                  {Countrys.map((data) => {
                    return (
                      <MenuItem key={data.id} value={data.Countryiso}>
                        <Typography
                          variant="string"
                          style={{
                            fontFamily: "kitab",
                            fontSize: 20,
                          }}
                          key={data.id}
                        >
                          {data.name}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {/* SELECT country */}
              {/* SELECT CITY */}
              <FormControl
                variant="standard"
                className={ms}
                sx={{ m: 1, minWidth: 180 }}
              >
                <InputLabel id="demo-simple-select-filled-label">
                  المدينة
                </InputLabel>

                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  {Countrys.find(
                    (country) => country.Countryiso == selectedCountry
                  )?.cities.map((city) => (
                    <MenuItem value={city.name} key={city.id}>
                      <Typography
                        variant="string"
                        style={{
                          fontSize: 20,
                        }}
                        key={city.id}
                      >
                        {city.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item="true" xs={12}>
            <Box
              style={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
              // sx={{ width: 180 }}
            >
              <Card
                className={ms}
                sx={{
                  width: "50%",
                  borderRadius: "10px",
                  marginLeft: 2,
                }}
              >
                <CardMedia
                  sx={{ height: 200 }}
                  image={Imag[nextPrayerIndex].location}
                  title="green iguana"
                >
                  <div
                    style={{
                      padding: 10,
                      display: "flex",
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      className="timeremaning"
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#ff8f00",
                      }}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      متبقي حتى صلاة
                    </Typography>
                    <Typography
                      style={{ fontFamily: "kitab", marginTop: 30 }}
                      gutterBottom
                      variant="h3"
                      component="div"
                    >
                      {prayersArray[nextPrayerIndex].displayName}
                    </Typography>
                    <Typography
                      style={{ fontFamily: "BakbakOne", color: "#ff8f00" }}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {remainingTime}
                    </Typography>
                  </div>
                </CardMedia>

                {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions> */}
              </Card>

              <Card className={ms} sx={{ width: "50%", borderRadius: "10px" }}>
                <CardMedia
                  sx={{ height: 200 }}
                  image={Imag[timeNow]?.location || Imag[5].location}
                  title="green iguana"
                >
                  <div
                    style={{
                      padding: 10,
                      display: "flex",
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        color: "#ff8f00",
                      }}
                      gutterBottom
                      // variant="h5"
                      component="div"
                    >
                      الآن وقت صلاة
                    </Typography>
                    <Typography
                      style={{ fontFamily: "kitab", marginTop: 30 }}
                      gutterBottom
                      variant="h3"
                      component="div"
                    >
                      {prayersArray[timeNow]?.displayName ||
                        prayersArray[4].displayName}
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "BakbakOne",
                        direction: "ltr",
                        color: "#ff8f00",
                      }}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {SalatTime[timeNow]?.time || SalatTime[5].time}
                    </Typography>
                  </div>
                </CardMedia>

                {/* <CardActions>
                <Button size="small">Share</Button
                <Button size="small">Learn More</Button>
              </CardActions> */}
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Grid
          style={{
            background:
              timeNow === 0 && ms == "Card-light"
                ? "#ff8f00"
                : timeNow === 0 && ms == "Card-dark"
                ? "#ff8f00"
                : ms == "Card-dark"
                ? "#263238"
                : null,
          }}
          className={ms}
          item="true"
          xs={12}
        >
          <Prayer
            name="الفجر "
            time={moment(timings.Fajr, "HH:mm").format("HH:mm a")}
            icon={<FilterDramaIcon />}
          />
        </Grid>
        <Grid
          style={{
            background:
              timeNow === 1 && ms == "Card-light"
                ? "#ff8f00"
                : timeNow === 1 && ms == "Card-dark"
                ? "#ff8f00"
                : ms == "Card-dark"
                ? "#263238"
                : null,
          }}
          className={ms}
          item="true"
          xs={12}
        >
          <Prayer
            name="الشروق "
            time={moment(timings.Sunrise, "HH:mm").format("HH:mm a")}
            icon={<LightModeIcon />}
          />
        </Grid>
        <Grid
          style={{
            background:
              nextPrayerIndex === 2 && ms == "Card-light"
                ? "#ff8f00"
                : nextPrayerIndex === 2 && ms == "Card-dark"
                ? "#ff8f00"
                : ms == "Card-dark"
                ? "#263238"
                : null,
          }}
          className={ms}
          item="true"
          xs={12}
        >
          <Prayer
            name="الظهر "
            time={moment(timings.Dhuhr, "HH:mm").format("HH:mm a")}
            icon={<Brightness7Icon />}
          />
        </Grid>
        <Grid
          style={{
            background:
              nextPrayerIndex === 3 && ms == "Card-light"
                ? "#ff8f00"
                : nextPrayerIndex === 3 && ms == "Card-dark"
                ? "#ff8f00"
                : ms == "Card-dark"
                ? "#263238"
                : null,
          }}
          className={ms}
          item="true"
          xs={12}
        >
          <Prayer
            name="العصر "
            time={moment(timings.Asr, "HH:mm").format("HH:mm a")}
            icon={<Brightness5Icon />}
          />
        </Grid>
        <Grid
          style={{
            background:
              nextPrayerIndex === 4 && ms == "Card-light"
                ? "#ff8f00"
                : nextPrayerIndex === 4 && ms == "Card-dark"
                ? "#ff8f00"
                : ms == "Card-dark"
                ? "#263238"
                : null,
          }}
          className={ms}
          item="true"
          xs={12}
        >
          <Prayer
            name="المغرب "
            time={moment(timings.Sunset, "HH:mm").format("HH:mm a")}
            icon={<Brightness6Icon />}
          />
        </Grid>
        <Grid
          style={{
            background:
              nextPrayerIndex === 0 && ms == "Card-light"
                ? "#ff8f00"
                : nextPrayerIndex === 0 && ms == "Card-dark"
                ? "#ff8f00"
                : ms == "Card-dark"
                ? "#263238"
                : null,
          }}
          className={ms}
          item="true"
          xs={12}
        >
          <Prayer
            name="العشاء "
            time={moment(timings.Isha, "HH:mm").format("HH:mm a")}
            icon={<Brightness2Icon />}
          />
        </Grid>
      </Box>
    </Container>
  );
}
