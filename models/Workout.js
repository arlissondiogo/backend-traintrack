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
    },
    repeticoes: {
      type: Number,
      required: true,
    },
    carga: {
      type: Number,
      required: false,
      min: [0, "Carga não pode ser negativa"], // Validação de carga
    },
    tempoDescanso: {
      type: Number,
      required: false,
      min: [0, "Tempo de descanso não pode ser negativo"], // Validação de tempo de descanso
    },
    tempoExecucao: {
      type: Number,
      required: false,
      min: [0, "Tempo de execução não pode ser negativo"], // Validação de tempo de execução
    },
  },
  {
    timestamps: true, // Garante a criação dos campos createdAt e updatedAt
  }
);

module.exports = mongoose.model("Workout", workoutSchema);
