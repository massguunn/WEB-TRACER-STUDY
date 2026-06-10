const express = require("express");
const router = express.Router();

const statistikController = require("../controllers/statistikController");

router.get("/statistik", statistikController.statistik);

module.exports = router;

