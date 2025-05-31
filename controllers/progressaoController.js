const Workout = require("../models/Workout");
const mongoose = require("mongoose");

// 1. Frequência de treinos por semana
const getFrequenciaTreino = async (req, res) => {
  try {
    const userId = req.userId;

    const frequencia = await Workout.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            week: { $isoWeek: "$createdAt" },
          },
          totalTreinos: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.week": 1 } },
    ]);

    res.json(frequencia);
  } catch (err) {
    res.status(500).json({ error: "Erro ao calcular frequência" });
  }
};

// 2. Volume total por dia
const getVolumeTotal = async (req, res) => {
  try {
    const userId = req.userId;

    const volume = await Workout.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $addFields: {
          volume: {
            $multiply: [
              { $ifNull: ["$series", 0] },
              { $ifNull: ["$repeticoes", 0] },
              { $ifNull: ["$carga", 0] },
            ],
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          volumeTotal: { $sum: "$volume" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    res.json(volume);
  } catch (err) {
    console.error("Erro real:", err);
    res.status(500).json({ error: "Erro ao calcular volume total" });
  }
};

// 3. Progresso de carga por exercício ao longo do tempo
const getProgressoCarga = async (req, res) => {
  try {
    const userId = req.userId;

    const progresso = await Workout.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            nomeExercicio: "$nomeExercicio",
            year: { $year: "$createdAt" },
            week: { $isoWeek: "$createdAt" },
          },
          cargaMedia: { $avg: "$carga" },
          cargaMaxima: { $max: "$carga" },
        },
      },
      { $sort: { "_id.nomeExercicio": 1, "_id.year": 1, "_id.week": 1 } },
    ]);

    res.json(progresso);
  } catch (err) {
    res.status(500).json({ error: "Erro ao calcular progresso de carga" });
  }
};

// 4. Tempo total de treino por dia
const getTempoTotal = async (req, res) => {
  try {
    const userId = req.userId;

    const tempo = await Workout.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $addFields: {
          tempoTotal: {
            $add: [
              { $ifNull: ["$tempoExecucao", 0] },
              { $ifNull: ["$tempoDescanso", 0] },
            ],
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          tempoTotal: { $sum: "$tempoTotal" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    res.json(tempo);
  } catch (err) {
    res.status(500).json({ error: "Erro ao calcular tempo total" });
  }
};

// 5. Distribuição por tipo de exercício
const getDistribuicaoExercicios = async (req, res) => {
  try {
    const userId = req.userId;

    const distribuicao = await Workout.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$nomeExercicio",
          total: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json(distribuicao);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao calcular distribuição de exercícios" });
  }
};

// 6. Comparativo entre exercícios (média de carga)
const getComparativoExercicios = async (req, res) => {
  try {
    const userId = req.userId;

    const comparativo = await Workout.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$nomeExercicio",
          cargaMedia: { $avg: "$carga" },
          cargaMaxima: { $max: "$carga" },
        },
      },
      { $sort: { cargaMedia: -1 } },
    ]);

    res.json(comparativo);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao calcular comparativo de exercícios" });
  }
};

module.exports = {
  getFrequenciaTreino,
  getVolumeTotal,
  getProgressoCarga,
  getTempoTotal,
  getDistribuicaoExercicios,
  getComparativoExercicios,
};
