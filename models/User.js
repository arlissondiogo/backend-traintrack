const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    sexo: {
      type: String,
      required: true,
    },
    peso: {
      type: Number, // Certifique-se de que o tipo está correto
      required: false,
    },
    altura: {
      type: Number, // Certifique-se de que o tipo está correto
      required: false,
    },
    idade: {
      type: Number, // Certifique-se de que o tipo está correto
      required: false,
    },
    senha: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
