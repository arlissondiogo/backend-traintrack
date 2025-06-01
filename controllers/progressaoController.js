const Workout = require("../models/Workout");
const mongoose = require("mongoose");

// 1. Progresso de carga por exercício (com filtro)
const getProgressoCarga = async (req, res) => {
  try {
    const userId = req.userId;
    const { exercicio, mes } = req.query;

    const matchStage = {
      user: new mongoose.Types.ObjectId(userId),
    };

    if (exercicio) {
      matchStage.nomeExercicio = exercicio;
    }

    if (mes) {
      matchStage["$expr"] = {
        $eq: [{ $month: "$createdAt" }, parseInt(mes)],
      };
    }

    const progresso = await Workout.aggregate([
      { $match: matchStage },
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
    res.status(500).json({ error: "Erro ao calcular volume total" });
  }
};

module.exports = {
  getProgressoCarga,
  getVolumeTotal,
};
