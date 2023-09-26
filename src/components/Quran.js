import React, { useState, useEffect } from "react";
import QuranData from "./QuranData.json";
import { useHistory } from "react-router-dom";
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

function Quran() {
  const [selectedItem, setSelectedItem] = useState(null);

  const [display, setDisplay] = useState(1);

  const history = useHistory();

  function suralistOpene() {
    setDisplay(1);
  }

  function TafseerOpen() {
    history.push("/Tafseer");
  }

  function homeOpene() {
    history.push("/");
  }

  const handleItemClick = (itemId) => {
    const selected = QuranData.find((item) => item.id === itemId);
    setSelectedItem(selected);
    setDisplay(2);
  };

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
            onClick={TafseerOpen}
          >
            التفسير
          </Button>

          <List aria-label="surahs">
            {display === 1 ? (
              <Typography
                className="suraname"
                style={{
                  fontFamily: "kitab",
                  fontWeight: "bold",
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                الفهرس
              </Typography>
            ) : (
              <Typography
                className="suraname"
                style={{
                  fontFamily: "kitab",
                  fontWeight: "bold",
                  fontSize: 20,
                  marginBottom: 10,
                }}
              >
                {" ﴿ ⁠" + selectedItem.name + " ﴾ "}
              </Typography>
            )}
            <CardContent
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
              ) : (
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
                      style={{ fontFamily: "kitab", fontSize: 20 }}
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
              )}
            </CardContent>
          </List>
        </CardContent>
      </CardContent>
    </Card>
  );
}

export default Quran;
