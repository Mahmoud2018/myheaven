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
  const [display, setDisplay] = useState(
    statofDisplsy === null ? 1 : statofDisplsy
  );
  const [quraa, setquraa] = useState("ar.alafasy");
  const [isPlaying, setIsPlaying] = useState(false);

  console.log(display);
  console.log(selectedItem);
  function suralistOpene() {
    setDisplay(1);
    localStorage.setItem("statofDisplsy", JSON.stringify(1));
  }

  function TafseerOpen() {
    setDisplay(3);
    localStorage.setItem("statofDisplsy", JSON.stringify(3));
  }

  const TafeserShow = (itemId) => {
    setSelectedItem(itemId);
    setDisplay(4);
    localStorage.setItem("statofDisplsy", JSON.stringify(4));
    localStorage.setItem("statofselect", JSON.stringify(itemId));
  };

  const ShowQuran = (itemId) => {
    const selected = QuranData.find((item) => item.id === itemId);
    setSelectedItem(selected);
    setDisplay(2);
    localStorage.setItem("statofDisplsy", JSON.stringify(2));
    localStorage.setItem("statofselect", JSON.stringify(selected));
  };

  const filterAya = TafseerData.filter((item) => item.number == selectedItem);
  const AudioUrl = `http://cdn.islamic.network/quran/audio-surah/128/${quraa}/${selectedItem.id}.mp3`;

  const handleChange = (event) => {
    setquraa(event.target.value);
  };

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

      {display === 2 ? (
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
        {display === 1 ? (
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

        {display === 2 ? (
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
                {AllQurra.map((data) => {
                  return (
                    <MenuItem key={data.id} value={data.identifier}>
                      {data.name}
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

        {display === 3 ? (
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

        {display === 4 ? (
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
            // minWidth: 250,
            // borderRadius: "20px",
          }}
          container
          // maxWidth="sm"
          spacing={2}
          style={{
            // width: 450,
            // display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            // flexDirection: "column",
            // background: "green",
            padding: "5px",
            height:
              display === 1
                ? "82vh"
                : display === 3
                ? "82vh"
                : display === 4
                ? "82vh"
                : "66vh",
            borderRadius: "20px",
            overflow: "scroll",
          }}
        >
          {display === 1
            ? QuranData.map((data) => (
                <ListItem disablePadding key={data.id}>
                  <ListItemButton
                    style={{
                      display: "flex",
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
          {display === 2 ? (
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

          {display === 3
            ? QuranData.map((data) => (
                <ListItem disablePadding key={data.id}>
                  <ListItemButton
                    style={{
                      display: "flex",
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
          {display === 4
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
