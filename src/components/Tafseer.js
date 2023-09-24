import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
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
  const [tfser, setTfser] = useState({
    tafseerID: [],
    AllsuraNames: [],
    tafseerNames: [],
    Tfsertext: [],
    AllayahNumber: [],
  });
  const [tafseerName, settafseerName] = useState(null);
  const [tafseerSuraNumber, settafseerSuraNumber] = useState(null);
  const [tafseerLastNumber, settafseerLastNumber] = useState(null);
  const [tafseerText, settafseerText] = useState([]);

  const [display, setDisplay] = useState(1);

  // Function to fetch All surahs name
  useEffect(() => {
    const source1 = axios.CancelToken.source();
    const source2 = axios.CancelToken.source(); // Create a cancel token source
    const source3 = axios.CancelToken.source(); // Create a cancel token source

    const request1 = axios.get("http://api.quran-tafseer.com/tafseer/", {
      cancelToken: source1.token, // Use the cancel token from the source
    });

    const request2 = axios.get(`http://api.quran-tafseer.com/quran/`, {
      cancelToken: source2.token, // Use the cancel token from the source
    });

    const request3 = axios.get(
      `http://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json`,
      {
        cancelToken: source3.token, // Use the cancel token from the source
      }
    );

    Promise.all([request1, request2, request3])
      .then(function (responses) {
        const tafseerNames = responses[0].data;
        const AllsuraNames = responses[1].data;
        const AllayahNumber = responses[2].data;

        // console.log(AllayahNumber);

        setTfser({
          ...tfser,
          AllsuraNames: AllsuraNames,
          tafseerNames: tafseerNames,
          AllayahNumber: AllayahNumber,
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

  function tafseerNameOpene(id) {
    settafseerName(id);
    setDisplay(2);
  }

  function tafseerSuraNumberOpen(number_of_surah, number_of_ayah) {
    settafseerSuraNumber(number_of_surah);
    settafseerLastNumber(number_of_ayah);
    setDisplay(3);
    openTafseerText();
  }

  // Function to fetch verses of a surah
  function openTafseerText() {
    const source = axios.CancelToken.source(); // Create a new cancel token source for the surah request

    axios
      .get(
        `http://api.quran-tafseer.com/tafseer/${tafseerName}/${tafseerSuraNumber}/1/${tafseerLastNumber}`,
        {
          cancelToken: source.token, // Use the cancel token from the source
        }
      )
      .then(function (response) {
        const Tfsertext = response.data;

        settafseerText(Tfsertext);
      })
      .catch(function (error) {
        console.log(error);
      });
    // Cleanup function to cancel the axios request when component unmounts or when opening a new surah
    return () => {
      source.cancel("Request canceled");
    };
  }

  function sortByCapacity(arr) {
    // Use the Array.prototype.sort() method to sort the array based on the 'capacity' property
    arr.sort((a, b) => a.ayah_number - b.ayah_number);
    return arr;
  }

  // fix number of ayah
  sortByCapacity(tafseerText);

  // Condition for each slide in the Header
  let Data = [];

  switch (display) {
    case 1:
      Data = tfser.tafseerNames.slice(0, 8);
      break;
    case 2:
      Data = tfser.AllayahNumber;
      break;
    case 3:
      Data = tafseerText;
      break;
    default:
      Data = [];
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
                className="suraname"
                style={{
                  fontFamily: "kitab",
                  fontWeight: "bold",
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                التفاسير
              </Typography>
            ) : null}

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
              {display === 1
                ? Data.map((data) => (
                    <ListItem disablePadding key={data.id} s>
                      <ListItemButton
                        style={{
                          display: "flex",
                          // justifyContent: "center",
                          // alignItems: "center",
                          textAlign: "center",
                          alignItems: "baseline",
                        }}
                        onClick={() => tafseerNameOpene(data.id)}
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
                          {"﴿⁠" + data.id + "﴾"}
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
                          fontSize: 10,
                          // marginBottom: 10,
                        }}
                      >
                        {data.author}
                      </Typography>
                    </ListItem>
                  ))
                : null}
              {/* == Tafeser page 1 == */}
              {/* Tafeser page 2 */}
              {display === 2
                ? Data.map((data) => (
                    <ListItem disablePadding key={data.index} s>
                      <ListItemButton
                        style={{
                          display: "flex",
                          // justifyContent: "center",
                          // alignItems: "center",
                          textAlign: "center",
                          alignItems: "baseline",
                        }}
                        onClick={() =>
                          tafseerSuraNumberOpen(
                            data.number_of_surah,
                            data.number_of_ayah
                          )
                        }
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
                          {"﴿⁠" + data.number_of_surah + "﴾"}
                        </Typography>
                        <Typography
                          style={{ fontFamily: "kitab", fontSize: 20 }}
                          // variant="body1"
                          align="right"
                        >
                          {data.name_translations.ar}
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
                        {data.number_of_ayah}
                      </Typography>
                    </ListItem>
                  ))
                : null}
              {/* == Tafeser page 2 == */}
              {/* {console.log(Data)} */}
              {display === 3
                ? Data.map((data) => (
                    <>
                      <Typography
                        // key={data.ayah_number}
                        className="suraname"
                        style={{
                          fontFamily: "kitab",
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        {" الأية رقم ﴿⁠" + data.ayah_number + "﴾"}
                      </Typography>
                      <Typography
                        style={{ fontFamily: "kitab", fontSize: 20 }}
                        // variant="body1"
                        // align="right"
                      >
                        {data.text}
                      </Typography>
                    </>
                  ))
                : null}
              {/* Tafeser page 3 */}
              {/* == Tafeser page 3 == */}
            </CardContent>
          </List>
        </CardContent>
      </CardContent>
    </Card>
  );
}

export default Tafseer;
