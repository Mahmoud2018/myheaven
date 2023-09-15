import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Myheaven from "./components/Myheaven";
import { DataContext } from "./contexts/DataContext";
import { useState } from "react";
import MySnackBar from "./components/MySnackBar";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#fbc02d",
    },
    secondary: {
      main: "#212121",
    },
  },
});

let stordScore = 0;
stordScore = JSON.parse(localStorage.getItem("score"));

function App() {
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(stordScore);
  const [message, setmessage] = useState("");
  const [color, setcolor] = useState("");

  function showHideToast(message, color) {
    setOpen(true);
    setmessage(message);
    setcolor(color);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }

  return (
    <ThemeProvider theme={theme}>
      <MySnackBar open={open} message={message} color={color} />
      <DataContext.Provider value={{ showHideToast, score, setScore }}>
        <div
          className="App"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#191b1f",
            height: "100vh",
            direction: "rtl",
          }}
        >
          <Myheaven />
        </div>
      </DataContext.Provider>
    </ThemeProvider>
  );
}

export default App;
