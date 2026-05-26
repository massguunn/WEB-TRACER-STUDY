const mysql = require("mysql2");

console.log("DB_HOST =", process.env.DB_HOST);
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_NAME =", process.env.DB_NAME);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

db.connect((err) => {
  if (err) {
    console.log("DATABASE GAGAL TERKONEKSI:", err);
  } else {
    console.log(" DATABASE BERHASIL TERKONEKSI");
  }
});

module.exports = db;
