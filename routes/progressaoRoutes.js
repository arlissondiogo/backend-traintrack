const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getVolumeTotal,
  getProgressoCarga,
  getExerciciosUnicos,
} = require("../controllers/progressaoController");

router.get("/volume-total", authMiddleware, getVolumeTotal);
router.get("/progresso-carga", authMiddleware, getProgressoCarga);
router.get("/exercicios-unicos", authMiddleware, getExerciciosUnicos);

module.exports = router;
