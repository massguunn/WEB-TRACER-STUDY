const express = require("express");
const { isLogin, isAdmin } = require("../../middleware/authMiddleware");
const router = express.Router();

router.get("/dashboard", isLogin, isAdmin, (req, res) => {
  res.send("DASHBOARD ADMIN");
});

module.exports = router;
