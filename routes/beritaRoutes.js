const express = require("express");
const router = express.Router();

const beritaController = require("../controllers/beritaController");

router.get("/berita", beritaController.berita);

module.exports = router;
