const express = require("express");
const router = express.Router();
const { getProgressao } = require("../controllers/progressaoController");
const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/progressao/:exercicio", authMiddleware, getProgressao);

module.exports = router;
