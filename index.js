require("dotenv").config();
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const db = require("./configs/db");
const cookieParser = require("cookie-parser");

const app = express();

app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT NOW() AS waktu");
    res.json(rows);
  } catch (err) {
    res.send(err);
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
