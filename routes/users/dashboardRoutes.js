const express = require("express");
const { isLogin, isMahasiswa } = require("../../middleware/authMiddleware");
const router = express.Router();

router.get("/dashboard", isLogin, isMahasiswa, (req, res) => {
  res.render("users/dashboard", {
    title: "Dashboard Mahasiswa",
    user: req.session.user,
  });
});

module.exports = router;
