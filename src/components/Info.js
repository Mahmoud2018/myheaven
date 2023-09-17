import * as React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
  marginLeft: theme.spacing(2),
  borderRadius: "10px",
  textAlign: "center",
  // fontFamily: "BakbakOne",
  color: theme.palette.text.secondary,
}));

export default function Info() {
  return (
    <Grid
      container
      spacing={2}
      style={{
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // flexDirection: "column",
      }}
    >
      <Item item xs={1}>
        <Typography style={{ fontSize: 12 }}>
          يتم حساب الذهب لجميع المهام المنجزة كل 20 ساعة يظهر زر (اجمع الذهب)
          عند النقر عليه يضاف الذهب لجميع العبادات المنجزة إلى رصيدك وتعود
          المهام بشكل تلقائي لغير منجزة لإنجازها من جديد وهكذا تستطيع أن تداوم
          على عبادتك وتلتزم فيها بشكل أسهل
        </Typography>
      </Item>

      <Item item xs={1}>
        <img src={"Info/Scorse.png"} alt="Logo" style={{ width: "100%" }} />
        <Typography style={{ fontSize: 15 }}>
          الذهب التي اكتسبها من انجاز جميع العبادات
        </Typography>
        <Typography color="primary" style={{ fontSize: 10 }}></Typography>
      </Item>

      <Item item xs={1}>
        <img src={"Info/non-complet.png"} alt="Logo" />
        <Typography style={{ fontFamily: "BakbakOne" }}></Typography>
        <Typography style={{ fontSize: 15 }}> العبادات الغير منجزة </Typography>
      </Item>

      <Item item xs={1}>
        <img src={"Info/complet.png"} alt="Logo" />
        <Typography style={{ fontFamily: "BakbakOne" }}></Typography>
        <Typography style={{ fontSize: 15 }}> العبادات المنجزة </Typography>
      </Item>

      <Item item xs={1}>
        <img src={"Info/counter.png"} alt="Logo" />
        <Typography style={{ fontFamily: "BakbakOne" }}></Typography>
        <Typography style={{ fontSize: 15 }}>إضافة نقطة فورية</Typography>
      </Item>

      <Item item xs={1}>
        <img src={"Info/Alsbah.png"} alt="Logo" />
        <Typography style={{ fontFamily: "BakbakOne" }}></Typography>
        <Typography style={{ fontSize: 15 }}>
          عند النقر تظهر أذكار الصباح
        </Typography>
      </Item>

      <Item item xs={1}>
        <img src={"Info/Almsaa.png"} alt="Logo" />
        <Typography style={{ fontFamily: "BakbakOne" }}></Typography>
        <Typography style={{ fontSize: 15 }}>
          عند النقر تظهر أذكار المساء
        </Typography>
      </Item>

      <Item item xs={1}>
        <img src={"Info/Athkar.png"} alt="Logo" />
        <Typography style={{ fontFamily: "BakbakOne" }}></Typography>
        <Typography style={{ fontSize: 15 }}>عند النقر يظهر الحديث </Typography>
      </Item>

      <Item item xs={1}>
        <img src={"Info/earn.png"} alt="Logo" />
        <Typography style={{ fontFamily: "BakbakOne" }}></Typography>
        <Typography style={{ fontSize: 15 }}>
          {" "}
          عند النقر يجمع الذهب من العبادات المنجزة
        </Typography>
      </Item>

      <Item item xs={1}>
        <img src={"Info/infoicon.gif"} alt="Logo" />
        <Typography style={{ fontFamily: "BakbakOne" }}></Typography>
        <Typography style={{ fontSize: 15 }}>شرح استخدام التطبيق</Typography>
      </Item>

      <Item item xs={1}>
        <img src={"Info/tasks.png"} alt="Logo" />
        <Typography style={{ fontFamily: "BakbakOne" }}></Typography>
        <Typography style={{ fontSize: 15 }}>
          لمهام المنجزة والغير منجز{" "}
        </Typography>
      </Item>

      <Item item xs={1}>
        <img src={"Info/present.png"} alt="Logo" />
        <Typography style={{ fontFamily: "BakbakOne" }}></Typography>
        <Typography style={{ fontSize: 15 }}>متجر الجوائز</Typography>
      </Item>

      <Item item xs={1}>
        <Typography style={{ fontSize: 12 }}>
          يساعدك تطبيق جنتي بناء جنتك الحقيقية في الدنيا باستخدام نموذج مرح
          ومشججع للاستمرار في عباداتك واعمالك الصالحة بنظام المكافأت منها
          الحقيقي الذي يحسب لك في الجنة ومنها التحفيزي كقطع الذهب في رصيدك
          وتستطيع ان تشتري عناصر مثل الفواكة والحلويات والحلى...التطبيق خالي من
          الدعايات وهو مجاني للجميع لانه صدقة جارية لوجه الله تعالى لا تنسونا من
          صالح دعائكم..
        </Typography>
      </Item>
    </Grid>
  );
}
