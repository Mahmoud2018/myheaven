import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Wred from "./Data";

const renderArrayElements = () => {
  return Wred.map((element, index) => (
    <Typography style={{ fontSize: 13 }}>
      <Divider style={{ color: "#5456454" }} />
      {index + 1}- {element}
      <Divider style={{ marginBottom: "20px", color: "#5456454" }} />
    </Typography>
  ));
};

function Alawrad() {
  return <Typography>{renderArrayElements()}</Typography>;
}

export default Alawrad;
