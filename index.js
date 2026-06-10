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
const loginRoutes = require("./routes/loginRoutes");
const beritaRoutes = require("./routes/beritaRoutes");
const statistikRoutes = require("./routes/statistikRoutes");

//routes login admin dan user
const adminDashboardRoutes = require("./routes/admin/dashboardRoutes");
const userDashboardRoutes = require("./routes/users/dashboardRoutes");

//midleware
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/adminlte",
  express.static(path.join(__dirname, "node_modules/admin-lte"))
);

app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap"))
);

app.use(
  "/fontawesome",
  express.static(
    path.join(__dirname, "node_modules/@fortawesome/fontawesome-free")
  )
);

//session
app.use(
  session({
    secret: "tracerstudy",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", homeRoutes);
app.use("/", loginRoutes);
app.use("/", beritaRoutes);
app.use("/", statistikRoutes); 

app.use("/admin", adminDashboardRoutes);
app.use("/users", userDashboardRoutes);

app.listen(port, () => {
  console.log(`SERVER RUNNING DI http://localhost:${port}`);
});
