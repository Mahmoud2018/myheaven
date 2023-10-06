import React, { useState, useEffect } from "react";
import QuranData from "./QuranData.json";
import ReactAudioPlayer from "react-audio-player";
import { TafseerData } from "./TafseerData";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { AllQurra } from "./AllQurra";
import { Qurra } from "./Qurra";
import { Test } from "./Test";
import Athkar from "./Athkar";
import {
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArticleIcon from "@mui/icons-material/Article";
import ListAltIcon from "@mui/icons-material/ListAlt";
// import QuranAudioPlayer from "./QuranAudioPlayer";
let statofDisplsy = JSON.parse(localStorage.getItem("statofDisplsy"));
let statofselect = JSON.parse(localStorage.getItem("statofselect"));
function Quran() {
  const [selectedItem, setSelectedItem] = useState(
    statofselect === null ? 0 : statofselect
  );
  const [displayQuran, setDisplayQuran] = useState(
    statofDisplsy === null ? 1 : statofDisplsy
  );

  const [quraa, setquraa] = useState("https://server7.mp3quran.net/s_gmd/");
  const [isPlaying, setIsPlaying] = useState(false);

  // console.log(displayQuran);
  // console.log(selectedItem);

  function suralistOpene() {
    setDisplayQuran(1);
    localStorage.setItem("statofDisplsy", JSON.stringify(1));
  }

  function TafseerOpen() {
    setDisplayQuran(3);
    localStorage.setItem("statofDisplsy", JSON.stringify(3));
  }

  const TafeserShow = (itemId) => {
    setSelectedItem(itemId);
    setDisplayQuran(4);
    localStorage.setItem("statofDisplsy", JSON.stringify(4));
    localStorage.setItem("statofselect", JSON.stringify(itemId));
  };

  const ShowQuran = (itemId) => {
    const selected = QuranData.find((item) => item.id === itemId);
    setSelectedItem(selected);
    setDisplayQuran(2);
    localStorage.setItem("statofDisplsy", JSON.stringify(2));
    localStorage.setItem("statofselect", JSON.stringify(selected));
  };

  const filterAya = TafseerData.filter((item) => item.number == selectedItem);

  function addLeadingZeros(number, length) {
    const numberString = String(number);
    const zerosToAdd = length - numberString.length;

    if (zerosToAdd <= 0) {
      return numberString;
    }

    const zeros = "0".repeat(zerosToAdd);
    return zeros + numberString;
  }

  const result = addLeadingZeros(selectedItem.id, 3);
  // console.log(result);

  // console.log(quraa);

  const AudioUrl = `${quraa}${result}.mp3`;

  const handleChange = (event) => {
    setquraa(event.target.value);
  };

  // Function return obj insid obj and obj insid object of array
  function GetObjects(arr) {
    const result = [];
    for (const item of arr) {
      if (item.moshaf === null || item.moshaf === undefined) {
        result.push({
          name: item.name,
          rwaia: null,
          server: null, // You can set this to a default value if needed
          surah_total: null, // You can set this to a default value if needed
        });
      } else {
        for (const moshafItem of item.moshaf) {
          result.push({
            name: item.name,
            rwaia:
              moshafItem.rwaia === undefined ? "رواية اخرى" : moshafItem.rwaia,
            server: moshafItem.server,
            surah_total: moshafItem.surah_total,
          });
        }
      }
    }
    return result;
  }

  const GetObject = GetObjects(Test);

  const filteredQurra = Qurra.filter((qari) => qari.surah_total === 114);

  return (
    <>
      <div style={{ marginBottom: "5px" }}></div>
      <Button
        variant="outlined"
        startIcon={<MenuBookIcon style={{ marginLeft: 10 }} />}
        onClick={suralistOpene}
      >
        فهرس القرآن
      </Button>
      <Button
        variant="outlined"
        startIcon={<ListAltIcon style={{ marginLeft: 10 }} />}
        onClick={TafseerOpen}
      >
        فهرس التفسير
      </Button>

      {displayQuran === 2 ? (
        <>
          <ReactAudioPlayer
            src={AudioUrl}
            autoPlay={false}
            controls
            volume={1.0}
            loop={false}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
        </>
      ) : null}
      <List aria-label="surahs">
        {displayQuran === 1 ? (
          <Typography
            className="titel-text"
            style={{
              color: "white",
              fontFamily: "kitab",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            ﴿ فهرس القرآن ﴾
          </Typography>
        ) : null}

        {displayQuran === 2 ? (
          <>
            <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
              <InputLabel id="demo-simple-select-label">
                المزيد من القرآء
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={quraa}
                label="Age"
                onChange={handleChange}
              >
                {Qurra.map((data) => {
                  return (
                    <MenuItem key={data.id} value={data.server}>
                      <Typography
                        variant="string"
                        style={{
                          fontFamily: "kitab",
                          fontSize: 20,
                        }}
                        key={data.id}
                      >
                        {data.name + "  "}
                        <span
                          style={{
                            color: "#fbc02d",
                            fontSize: 12,
                          }}
                        >
                          {"  " + data.rwaia}
                        </span>
                      </Typography>{" "}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Typography
              className="titel-text"
              style={{
                color: "white",
                fontFamily: "kitab",
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              {" ﴿ ⁠" + selectedItem.name + " ﴾ "}
            </Typography>
          </>
        ) : null}

        {displayQuran === 3 ? (
          <Typography
            className="titel-text"
            style={{
              color: "white",
              fontFamily: "kitab",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            ﴿ فهرس التفسير ﴾
          </Typography>
        ) : null}

        {displayQuran === 4 ? (
          <Typography
            className="titel-text"
            style={{
              color: "white",
              fontFamily: "kitab",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            ⁠ تفسير سورة ﴿ {QuranData[selectedItem - 1].name} ﴾
          </Typography>
        ) : null}

        <CardContent
          sx={{
            border: 3,
            borderColor: "primary.main",
          }}
          container
          spacing={2}
          style={{
            justifyContent: "center",
            padding: "5px",
            height:
              displayQuran === 1
                ? "82vh"
                : displayQuran === 3
                ? "82vh"
                : displayQuran === 4
                ? "80vh"
                : displayQuran === 5
                ? "82vh"
                : "66vh",
            borderRadius: "20px",
            overflow: "scroll",
          }}
        >
          {displayQuran === 1
            ? QuranData.map((data) => (
                <ListItem disablePadding key={data.id}>
                  <ListItemButton
                    style={{
                      displayQuran: "flex",
                      // justifyContent: "center",
                      // alignItems: "center",
                      textAlign: "center",
                      alignItems: "baseline",
                    }}
                    onClick={() => ShowQuran(data.id)}
                  >
                    <Typography
                      className="suraname"
                      style={{
                        fontFamily: "kitab",
                        fontWeight: "bold",
                        fontSize: 18,
                        marginLeft: 10,
                      }}
                    >
                      {" ﴿⁠" + data.id + "﴾ "}
                    </Typography>
                    <Typography
                      // className="suraname"
                      style={{ fontFamily: "kitab", fontSize: 20 }}
                      // variant="body1"
                      align="right"
                    >
                      {data.name}
                    </Typography>
                  </ListItemButton>
                  <Typography
                    className="suraname"
                    style={{
                      fontFamily: "kitab",
                      fontWeight: "bold",
                      fontSize: 18,
                      // marginBottom: 10,
                    }}
                  >
                    {data.type}
                  </Typography>
                </ListItem>
              ))
            : null}
          {displayQuran === 2 ? (
            <>
              <Typography
                variant="string"
                style={{
                  fontFamily: "kitab",
                  fontSize: 20,
                }}
              >
                {selectedItem.array.map((arItem) => (
                  <Typography
                    variant="string"
                    style={{
                      fontFamily: "othmani",
                      fontSize: 22,
                      // fontWeight: "600",
                    }}
                    key={arItem.id}
                  >
                    {arItem.ar}
                    <span
                      style={{ paddingLeft: 10, paddingRight: 10 }}
                      className="suranumber"
                    >
                      ﴿{arItem.id}﴾
                    </span>
                  </Typography>
                ))}
              </Typography>
            </>
          ) : null}

          {displayQuran === 3
            ? QuranData.map((data) => (
                <ListItem disablePadding key={data.id}>
                  <ListItemButton
                    style={{
                      displayQuran: "flex",
                      // justifyContent: "center",
                      // alignItems: "center",
                      textAlign: "center",
                      alignItems: "baseline",
                    }}
                    onClick={() => TafeserShow(data.id)}
                  >
                    <Typography
                      className="suraname"
                      style={{
                        fontFamily: "kitab",
                        fontWeight: "bold",
                        fontSize: 18,
                        marginLeft: 10,
                      }}
                    >
                      {" ﴿⁠" + data.id + "﴾ "}
                    </Typography>
                    <Typography
                      style={{ fontFamily: "kitab", fontSize: 20 }}
                      // variant="body1"
                      align="right"
                    >
                      {data.name}
                    </Typography>
                  </ListItemButton>
                  <Typography
                    className="suraname"
                    style={{
                      fontFamily: "kitab",
                      fontWeight: "bold",
                      fontSize: 18,
                      // marginBottom: 10,
                    }}
                  >
                    {data.type}
                  </Typography>
                </ListItem>
              ))
            : null}
          {displayQuran === 4
            ? filterAya.map((arItem) => (
                <Typography
                  variant="string"
                  style={{ fontFamily: "kitab", fontSize: 18 }}
                  key={arItem.id}
                >
                  <span
                    key={arItem.id}
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                    className="suraname"
                  >
                    تفسير الآية رقم ﴿{arItem.aya}﴾
                  </span>
                  {arItem.text}
                </Typography>
              ))
            : null}
        </CardContent>
      </List>
    </>
  );
}

export default Quran;
