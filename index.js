require("dotenv").config();
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const db = require("./configs/db");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

const homeRoutes = require("./routes/homeRoutes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRoutes);

app.listen(port, () => {
  console.log(`SERVER RUNNING DI http://localhost:${port}`);
});