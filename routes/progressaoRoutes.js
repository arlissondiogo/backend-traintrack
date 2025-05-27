const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getFrequenciaTreino,
  getVolumeTotal,
  getProgressoCarga,
  getTempoTotal,
  getDistribuicaoExercicios,
  getComparativoExercicios,
} = require("../controllers/progressaoController");

router.get("/frequencia", authMiddleware, getFrequenciaTreino); // n° de treinos por semana/mês
router.get("/volume-total", authMiddleware, getVolumeTotal); // volume total (series * rep * carga)
router.get("/progresso-carga", authMiddleware, getProgressoCarga); // média ou pico de carga por exercício
router.get("/tempo-treino", authMiddleware, getTempoTotal); // tempo total do treino
router.get(
  "/distribuicao-exercicios",
  authMiddleware,
  getDistribuicaoExercicios
); // uso por nomeExercicio
router.get("/comparativo-exercicios", authMiddleware, getComparativoExercicios); // comparação de cargas

module.exports = router;
