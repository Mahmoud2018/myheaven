import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import QuranData from "./QuranData.json";
import TafseerData from "./TafseerData.json";

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
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArticleIcon from "@mui/icons-material/Article";
import ListAltIcon from "@mui/icons-material/ListAlt";
// import tfserAudioPlayer from "./tfserAudioPlayer";

function Tafseer() {
  const [selectedItem, setSelectedItem] = useState("");

  const [tafseerName, settafseerName] = useState([]);
  const [tafseerSuraNumber, settafseerSuraNumber] = useState([]);
  const [tafseerLastNumber, settafseerLastNumber] = useState([]);
  const [tafseerText, settafseerText] = useState([]);

  const [display, setDisplay] = useState(1);

  const history = useHistory();

  function TfserOpene() {
    setDisplay(1);
    history.push("/Tafseer");
  }

  function suralistOpene() {
    history.push("/Quran");
  }

  function homeOpene() {
    history.push("/");
  }

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
    setDisplay(2);
  };

  const TafeserShow = (itemId) => {
    setSelectedItem(itemId);
    setDisplay(3);
  };

  const number2Objects = TafseerData.filter(
    (item) => item.number == selectedItem
  );

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
        sx={{ border: 3, borderColor: "primary.main", borderRadius: "20px" }}
        container
        maxWidth="sm"
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          flexDirection: "column",
          // overflow: "scroll",
        }}
      >
        <CardContent style={{ padding: "0px" }}>
          <Button
            variant="outlined"
            startIcon={<HomeIcon style={{ marginLeft: 10 }} />}
            onClick={homeOpene}
          >
            الرئيسية
          </Button>
          <Button
            variant="outlined"
            startIcon={<MenuBookIcon style={{ marginLeft: 10 }} />}
            onClick={suralistOpene}
          >
            القرآن
          </Button>
          <Button
            variant="outlined"
            startIcon={<ListAltIcon style={{ marginLeft: 10 }} />}
            onClick={TfserOpene}
          >
            التفسير
          </Button>

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
                ﴿ ⁠فهرس التفسير ﴾
              </Typography>
            ) : (
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
                ﴿⁠ تفسير سورة {QuranData[selectedItem - 1].name} ﴾
              </Typography>
            )}

            <CardContent
              // Tafeser page 1
              sx={{
                border: 3,
                borderColor: "primary.main",
                // borderRadius: "20px",
              }}
              container
              maxWidth="sm"
              spacing={2}
              style={{
                // display: "flex",
                justifyContent: "center",
                // alignItems: "center",
                // flexDirection: "column",
                padding: "5px",
                height: "83vh",
                overflow: "scroll",
              }}
            >
              {display === 1 ? (
                QuranData.map((data) => (
                  <ListItem disablePadding key={data.id}>
                    <ListItemButton
                      style={{
                        display: "flex",
                        // justifyContent: "center",
                        // alignItems: "center",
                        textAlign: "center",
                        alignItems: "baseline",
                      }}
                      onClick={() => handleItemClick(data.id)}
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
              ) : (
                <Typography
                  variant="string"
                  style={{
                    fontFamily: "kitab",
                    fontSize: 20,
                  }}
                >
                  {number2Objects.map((arItem) => (
                    <Typography
                      variant="string"
                      style={{ fontFamily: "kitab", fontSize: 18 }}
                      key={arItem.number}
                    >
                      <span
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                        className="suraname"
                      >
                        تفسير الآية رقم ﴿{arItem.aya}﴾
                      </span>
                      {arItem.text}
                    </Typography>
                  ))}
                </Typography>
              )}
              {/* == Tafeser page 1 == */}
            </CardContent>
          </List>
        </CardContent>
      </CardContent>
    </Card>
  );
}

export default Tafseer;
