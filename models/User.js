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
      match: [/\S+@\S+\.\S+/, "Por favor, insira um email válido"],
    },
    peso: {
      type: Number,
      default: 0,
    },
    altura: {
      type: Number,
      default: 0,
    },
    idade: {
      type: Number,
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
