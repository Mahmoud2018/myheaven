import React, { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { v4 as uuidv4 } from "uuid";
import Paper from "@mui/material/Paper";
import { Card } from "@mui/material";
import Container from "@mui/material/Container";
import { DataContext } from "../contexts/DataContext";
import Divider from "@mui/material/Divider";

// DIALOG IMPORTS
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import cash from "../Sounds/cash.mp3";

const Items = [
  { id: uuidv4(), Item: 0, pic: "Fruits/1.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Fruits/2.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Fruits/3.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Fruits/4.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Fruits/5.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Fruits/6.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Fruits/7.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Fruits/8.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Fruits/9.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Fruits/10.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Fruits/11.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Fruits/12.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Fruits/13.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Fruits/14.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Fruits/15.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Fruits/16.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Fruits/17.png", prise: 500 },
  { id: uuidv4(), Item: 0, pic: "Items/1.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/2.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/3.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/4.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/5.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/6.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/7.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/8.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/9.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/10.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/11.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/12.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/13.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/14.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/15.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/16.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/17.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Items/18.png", prise: 750 },
  { id: uuidv4(), Item: 0, pic: "Godis/1.png", prise: 1000 },
  { id: uuidv4(), Item: 0, pic: "Godis/2.png", prise: 1000 },
  { id: uuidv4(), Item: 0, pic: "Godis/3.png", prise: 1000 },
  { id: uuidv4(), Item: 0, pic: "Godis/4.png", prise: 1000 },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function MyItems() {
  const { score, setScore, showHideToast } = useContext(DataContext);
  const [data, setdata] = useState(() => {
    const savedItems = localStorage.getItem("items");
    const parsedItems = JSON.parse(savedItems);
    return parsedItems ? parsedItems : Items;
  });

  const Cash = new Audio(cash);

  const playSound = (effect) => {
    effect.loop = false;
    effect.play();
  };

  const ShopItmes = (taskId) => {
    setdata((prevData) =>
      prevData.map((obj) => {
        if (obj.id === taskId && score >= obj.prise) {
          const newScore = score - obj.prise;
          playSound(Cash);
          setScore(newScore);
          showHideToast("تم شراء الهدية", "success");
          let updatedItems = { ...obj, Item: obj.Item + 1 };
          return updatedItems;
        } else if (obj.id === taskId && score < obj.prise) {
          showHideToast(" ليس لديك ذهب كافي", "warning");
        }
        return obj;
      })
    );
  };

  // Save the Items array to local storage whenever it changes
  React.useEffect(() => {
    localStorage.setItem("items", JSON.stringify(data));
  }, [data]);

  return (
    <Container
      maxWidth="sm"
      style={{
        // marginTop: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Card
        maxWidth="sm"
        style={{
          // width: 10,
          // background: "green",
          maxHeight: "92.5vh",
          overflow: "scroll",
        }}
        sx={{
          minWidth: 400,
          // width: "100%"
          marginTop: 1,
        }}
      >
        <Typography
          style={{
            marginRight: 12,
            fontFamily: "Rocher",
            fontSize: 30,
            // display: "flex",
            // alignItems: "center",
          }}
          color="primary"
        >
          My Stor
        </Typography>
        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            marginTop: "5px",
          }}
        >
          {data.map((obj) => {
            return (
              <Item item xs={2} style={{ borderRadius: "20px" }}>
                <img
                  src={obj.pic}
                  style={{ width: 80, height: 80 }}
                  alt="Logo"
                />

                <Typography
                  style={{
                    marginRight: 12,
                    fontFamily: "BakbakOne",
                    fontSize: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                  color="primary"
                >
                  {obj.prise}
                  <img
                    src={"scores/1.png"}
                    style={{ marginRight: 5, width: 20, height: 20 }}
                    alt="Logo"
                  />
                </Typography>

                <IconButton
                  color="primary"
                  aria-label="add to shopping cart"
                  onClick={() => ShopItmes(obj.id)}
                >
                  <AddIcon />
                  <Typography>شراء</Typography>
                </IconButton>
                {/* <Divider
                  style={{ background: "#fbc02d" }}
                  sx={{ borderBottomWidth: "2px" }}
                /> */}
                <Typography
                  style={{ fontSize: 35, fontFamily: "Rocher", color: "red" }}
                >
                  {obj.Item}
                </Typography>
              </Item>
            );
          })}
        </Grid>
      </Card>
    </Container>
  );
}
