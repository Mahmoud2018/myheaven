import "./App.css";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Myheaven from "./components/Myheaven";
import { DataContext } from "./contexts/DataContext";
import { useState, useContext, createContext, useMemo, useEffect } from "react";
import MySnackBar from "./components/MySnackBar";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";

const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export function Darkmode() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? <LightModeIcon /> : <Brightness2Icon />}
    </IconButton>
  );
}

let stordScore = JSON.parse(localStorage.getItem("score"));
function App() {
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(stordScore === null ? 0 : stordScore);
  const [message, setmessage] = useState("");
  const [color, setcolor] = useState("");

  const [mode, setMode] = useState("light");

  // Load mode from local storage on initial render
  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          // Save the new mode in local storage
          localStorage.setItem("mode", newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: ["Alexandria"],
        },
        palette: {
          mode,
          primary: {
            main: "#fbc02d",
          },
          secondary: {
            main: "#212121",
          },
        },
      }),
    [mode]
  );

  function showHideToast(message, color) {
    setOpen(true);
    setmessage(message);
    setcolor(color);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MySnackBar open={open} message={message} color={color} />
        <DataContext.Provider value={{ showHideToast, score, setScore }}>
          <div
            className="App"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // background: "#191b1f",
              height: "100vh",
              direction: "rtl",
            }}
          >
            <Myheaven theme={theme} />
          </div>
        </DataContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
