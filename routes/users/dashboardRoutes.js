const express = require("express");
const { isLogin, isMahasiswa } = require("../../middleware/authMiddleware");
const router = express.Router();

router.get("/dashboard", isLogin, isMahasiswa, (req, res) => {
  res.send("DASHBOARD MAHASISWA");
});

module.exports = router;
