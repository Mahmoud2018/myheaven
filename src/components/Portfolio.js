import React from "react";
import { Card } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import { TypeAnimation } from "react-type-animation";
import Link from "@mui/material/Link";
import ProgressBar from "./ProgressBar";

const Portfolio = () => {
  return (
    <Card
      maxWidth="sm"
      style={{
        // width: 10,
        // background: "green",
        maxHeight: "92vh",
        overflow: "scroll",
      }}
      sx={{
        minWidth: 400,
        // width: "100%"
        marginTop: 1,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        style={{
          // marginTop: "350px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          style={{
            marginTop: 10,
            fontSize: "20px",
            fontFamily: "BakbakOne",
            color: "#fbc02d",
          }}
        >
          My heaven App Created by
        </Typography>
        <Avatar
          style={{ marginTop: 20, border: "4px solid", color: "#fbc02d" }}
          alt="Remy Sharp"
          src="team/M1.jpg"
          sx={{ width: 110, height: 110 }}
        />
      </Stack>

      <Typography
        style={{ marginTop: 20, fontSize: "20px", fontFamily: "BakbakOne" }}
      >
        Mahmoud Aboria
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href="https://www.linkedin.com/in/mahmoudaboria/">
          <IconButton color="primary" aria-label="add to shopping cart">
            <LinkedInIcon />
          </IconButton>
        </Link>
        <Link href="https://www.facebook.com/iT.Fix.service">
          <IconButton color="primary" aria-label="add to shopping cart">
            <FacebookIcon />
          </IconButton>
        </Link>
        <Link href="https://www.instagram.com/it.fix.service/">
          <IconButton color="primary" aria-label="add to shopping cart">
            <InstagramIcon />
          </IconButton>
        </Link>
        <Link href="https://mahmoud2018.github.io/IT-Fix/">
          <IconButton color="primary" aria-label="add to shopping cart">
            <LanguageIcon />
          </IconButton>
        </Link>
      </Stack>

      <Typography style={{ fontSize: "20px", fontFamily: "BakbakOne" }}>
        I'm
      </Typography>
      <TypeAnimation
        preRenderFirstString={true}
        color="primary"
        sequence={[
          500,
          "IT Technician Support", // initially rendered starting point
          1000,
          "Designer",
          1000,
          "Junior Developer",
          1000,
          "IT Teacher",
          500,
        ]}
        speed={50}
        style={{
          paddingBottom: 20,
          fontSize: "20px",
          fontFamily: "BakbakOne",
          color: "#fbc02d",
        }}
        repeat={Infinity}
      />
      <Typography
        style={{
          marginTop: 10,
          fontSize: "20px",
          // fontFamily: "BakbakOne",
          color: "#fbc02d",
        }}
      >
        مشاريع اخرى
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "BakbakOne",
          // flexDirection: "column",
        }}
      >
        <Link dir="rtl" href="https://mahmoud2018.github.io/IT-Fix/">
          1 - موقع IT Fix website
        </Link>
        <Link dir="rtl" href="https://mahmoud2018.github.io/Questions-Game/">
          2 - لعبة الأسئلة
        </Link>
        <Link dir="rtl" href="https://mahmoud2018.github.io/Dishes_Names/">
          3 - أسماء الطبخات
        </Link>
        <Link dir="ltr" href="https://mahmoud2018.github.io/To-Do-List/">
          4 - قائمة المهام To Do List
        </Link>
      </Stack>

      <div dir="ltr" className="team-member">
        <div className="intyg">
          <ul className="Textlist">
            <li className="Text1">Mahmoud Aboria</li>
            <li>IT Technician Support 5 years</li>
            <li>Designer 5 years</li>
            <li>IT Teacher 2 years</li>
          </ul>
          <ul className="Textlist">
            <li className="Text2">Certification</li>

            <li>Diplom IT-tekniker, Lexicon University</li>
            <li>
              IT Essentials, Cisco <span className="Textend">Certified</span>
            </li>
            <li>
              Microsoft Azure Fundamentals,{" "}
              <span className="Textend">Certified</span>
            </li>
            <li>
              Microsoft 365 Fundamentals,{" "}
              <span className="Textend">Certified</span>
            </li>
            <li>
              NDG Linux Unhatched , Cisco{" "}
              <span className="Textend">Certified</span>
            </li>
            <li>Photoshop- Illustrator- After Effect</li>
            <li>Microsoft Excel Avancerad</li>
            <li>Python</li>
          </ul>
        </div>
      </div>
      <ProgressBar />
    </Card>
  );
};

export default Portfolio;
