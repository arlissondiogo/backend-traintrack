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
    peso: {
      type: Number, // Certifique-se de que o tipo está correto
      default: 0,
    },
    altura: {
      type: Number, // Certifique-se de que o tipo está correto
      default: 0,
    },
    idade: {
      type: Number, // Certifique-se de que o tipo está correto
      default: 0,
    },
    senha: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
