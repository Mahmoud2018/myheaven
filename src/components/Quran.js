import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [quran, setQuran] = useState({
    AllNamms: [],
    Suraname: [],
    SuraText: [],
    QaraaNames: [],
  });

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
  // Function to fetch All surahs name
  useEffect(() => {
    const source1 = axios.CancelToken.source();
    const source2 = axios.CancelToken.source(); // Create a cancel token source

    const request1 = axios.get(
      "https://api.alquran.cloud/v1/quran/quran-uthmani",
      {
        cancelToken: source1.token, // Use the cancel token from the source
      }
    );

    const request2 = axios.get(
      `https://raw.githubusercontent.com/islamic-network/cdn/master/info/cdn_surah_audio.json`,
      {
        cancelToken: source2.token, // Use the cancel token from the source
      }
    );

    Promise.all([request1, request2])
      .then(function (responses) {
        const AllNamms = responses[0].data.data.surahs;
        const QaraaNames = responses[1].data;
        setQuran({
          ...quran,
          AllNamms: AllNamms,
          Suraname: [],
          SuraText: [],
          QaraaNames: QaraaNames,
        });
      })

      .catch(function (error) {
        console.log(error);
      });

    // Cleanup function to cancel the axios request
    return () => {
      source1.cancel("Request canceled");
      source2.cancel("Request canceled");
    };
  }, []); // Empty dependency array means this effect runs only once on component mount

  // Function to fetch verses of a surah
  function openSura(suraId) {
    const source1 = axios.CancelToken.source();
    const source2 = axios.CancelToken.source(); // Create a new cancel token source for the surah request

    const request1 = axios.get(
      `https://api.alquran.cloud/v1/quran/quran-uthmani`,
      {
        cancelToken: source1.token, // Use the cancel token from the source
      }
    );

    const request2 = axios.get(`http://api.quran-tafseer.com/tafseer/`, {
      cancelToken: source2.token, // Use the cancel token from the source
    });

    // Use Promise.all to wait for all requests to complete
    Promise.all([request1, request2])
      .then(function (responses) {
        const surahData = responses[0].data.data.surahs[suraId - 1];

        const SuraText = surahData.ayahs;
        const Suraname = surahData.name;

        setQuran({
          ...quran,
          Suraname: Suraname,
          SuraText: SuraText,
          // QaraaNames: QaraaNames,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    setDisplay(0);
    // Cleanup function to cancel the axios request when component unmounts or when opening a new surah
    return () => {
      source1.cancel("Request 1 canceled");
      source2.cancel("Request 2 canceled");
    };
  }

  // Condition for each slide in the Header
  let Data = [];

  switch (display) {
    case 1:
      Data = quran.AllNamms;
      break;
    default:
      Data = [];
  }

  let quranText = quran.SuraText.map((t) => (
    <Typography
      // sx={{ minWidth: 200 }}
      variant="string"
      // paragraph={true}
      style={{
        fontFamily: "kitab",
        fontSize: 20,

        // display: "flex",
        // textAlign: "center",
      }}
    >
      <span style={{ paddingLeft: 8, paddingRight: 8 }} className="suranumber">
        ﴿{t.numberInSurah}﴾
      </span>
      {t.text + " "}
    </Typography>
  ));

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
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                ({quran.Suraname})
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
              {display === 1
                ? Data.map((data) => (
                    <ListItem disablePadding key={data.number} s>
                      <ListItemButton
                        style={{
                          display: "flex",
                          // justifyContent: "center",
                          // alignItems: "center",
                          textAlign: "center",
                          alignItems: "baseline",
                        }}
                        onClick={() => openSura(data.number)}
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
                          {"﴿⁠" + data.number + "﴾"}
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
                        {data.revelationType === "Medinan" ? "مدنية" : "مكية"}
                      </Typography>
                    </ListItem>
                  ))
                : quranText}
            </CardContent>
          </List>
        </CardContent>
      </CardContent>
    </Card>
  );
}

export default Quran;
