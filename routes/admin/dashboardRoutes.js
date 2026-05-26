const express = require("express");
const { isLogin, isAdmin } = require("../../middleware/authMiddleware");
const router = express.Router();

router.get("/dashboard", isLogin, isAdmin, (req, res) => {
  res.render("admin/dashboard", {
    title: "Dashboard Admin",
    user: req.session.user,
  });
});

module.exports = router;
