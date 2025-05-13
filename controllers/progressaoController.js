const Workout = require("../models/Workout");

const getProgressao = async (req, res) => {
  try {
    const userId = req.user.id;
    const nomeExercicio = req.params.exercicio;

    const workouts = await Workout.find({
      user: userId,
      nomeExercicio,
    }).sort({ createdAt: 1 });

    const dados = workouts.map((w) => ({
      data: w.createdAt,
      carga: w.carga ?? 0,
      volume: (w.series ?? 0) * (w.repeticoes ?? 0) * (w.carga ?? 0),
    }));

    res.json(dados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao obter progressão" });
  }
};

module.exports = {
  getProgressao,
};
