const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nomeExercicio: {
      type: String,
      required: true,
    },
    series: {
      type: Number,
      required: true,
      min: [0, "Séries não pode ser negativa"],
    },
    repeticoes: {
      type: Number,
      required: true,
      min: [0, "Repetições não podem ser negativa"],
    },
    carga: {
      type: Number,
      required: false,
      min: [0, "Carga não pode ser negativa"],
    },
    tempoDescanso: {
      type: Number,
      required: false,
      min: [0, "Tempo de descanso não pode ser negativo"],
    },
    tempoExecucao: {
      type: Number,
      required: false,
      min: [0, "Tempo de execução não pode ser negativo"],
    },
  },
  {
    timestamps: true,
    runValidators: true,
  }
);

module.exports = mongoose.model("Workout", workoutSchema);
