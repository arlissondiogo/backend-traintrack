const Workout = require("../models/Workout");

exports.addWorkout = async (req, res) => {
  try {
    const {
      nomeExercicio,
      series,
      repeticoes,
      carga,
      tempoDescanso,
      tempoExecucao,
    } = req.body;
    const userId = req.userId;
    const novoTreino = new Workout({
      user: userId,
      nomeExercicio,
      series,
      repeticoes,
      carga,
      tempoDescanso,
      tempoExecucao,
    });

    await novoTreino.save();

    res.status(201).json({
      mensagem: "Treino adicionado com sucesso.",
      treino: novoTreino,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao adicionar treino." });
  }
};

exports.listWorkouts = async (req, res) => {
  try {
    const userId = req.userId;

    const treinos = await Workout.find({ user: userId });
    res.status(200).json({ treinos });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar treinos." });
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const treino = await Workout.findById(id);

    if (!treino) {
      return res.status(404).json({ erro: "Treino não encontrado." });
    }

    if (treino.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ erro: "Você não tem permissão para deletar este treino." });
    }

    await Workout.findByIdAndDelete(id);
    res.status(200).json({ mensagem: "Treino deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar treino." });
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nomeExercicio,
      series,
      repeticoes,
      carga,
      tempoDescanso,
      tempoExecucao,
    } = req.body;

    const treino = await Workout.findById(id);
    if (!treino) {
      return res.status(404).json({ erro: "Treino não encontrado." });
    }

    if (treino.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ erro: "Você não tem permissão para atualizar este treino." });
    }

    treino.nomeExercicio = nomeExercicio || treino.nomeExercicio;
    treino.series = series || treino.series;
    treino.repeticoes = repeticoes || treino.repeticoes;
    treino.carga = carga || treino.carga;
    treino.tempoDescanso = tempoDescanso || treino.tempoDescanso;
    treino.tempoExecucao = tempoExecucao || treino.tempoExecucao;

    await treino.save();

    res
      .status(200)
      .json({ mensagem: "Treino atualizado com sucesso.", treino });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar treino." });
  }
};
