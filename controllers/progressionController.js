const Workout = require("../models/Workout");
const mongoose = require("mongoose");

const getProgressoCarga = async (req, res) => {
  try {
    const userId = req.userId;
    const { exercicio, mes } = req.query;

    const matchStage = {
      user: new mongoose.Types.ObjectId(userId),
    };

    if (exercicio && exercicio !== "Todos") {
      matchStage.nomeExercicio = exercicio;
    }

    if (mes && mes !== "Todos") {
      matchStage["$expr"] = {
        $eq: [{ $month: "$createdAt" }, parseInt(mes)],
      };
    }

    console.log("Match stage para progresso:", matchStage);

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
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.nomeExercicio": 1, "_id.year": 1, "_id.week": 1 } },
    ]);

    console.log("Resultado progresso:", progresso);
    res.json(progresso);
  } catch (err) {
    console.error("Erro ao calcular progresso de carga:", err);
    res.status(500).json({ error: "Erro ao calcular progresso de carga" });
  }
};

const getVolumeTotal = async (req, res) => {
  try {
    const userId = req.userId;
    const { exercicio, mes } = req.query;

    const matchStage = {
      user: new mongoose.Types.ObjectId(userId),
    };

    if (exercicio && exercicio !== "Todos") {
      matchStage.nomeExercicio = exercicio;
    }

    if (mes && mes !== "Todos") {
      matchStage["$expr"] = {
        $eq: [{ $month: "$createdAt" }, parseInt(mes)],
      };
    }

    console.log("Match stage para volume:", matchStage);

    const volume = await Workout.aggregate([
      { $match: matchStage },
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
          exercicios: { $addToSet: "$nomeExercicio" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    console.log("Resultado volume:", volume);
    res.json(volume);
  } catch (err) {
    console.error("Erro ao calcular volume total:", err);
    res.status(500).json({ error: "Erro ao calcular volume total" });
  }
};

const getExerciciosUnicos = async (req, res) => {
  try {
    const userId = req.userId;

    const exercicios = await Workout.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$nomeExercicio",
          count: { $sum: 1 },
          ultimoTreino: { $max: "$createdAt" },
        },
      },
      { $sort: { ultimoTreino: -1 } },
    ]);

    const exerciciosUnicos = exercicios
      .map((item) => item._id)
      .filter((nome) => nome && nome.trim() !== "");

    console.log("Exercícios únicos encontrados:", exerciciosUnicos);
    res.json(exerciciosUnicos);
  } catch (err) {
    console.error("Erro ao buscar exercícios únicos:", err);
    res.status(500).json({ error: "Erro ao buscar exercícios únicos" });
  }
};

module.exports = {
  getProgressoCarga,
  getVolumeTotal,
  getExerciciosUnicos,
};
