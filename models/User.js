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
      min: [0, "Peso não pode ser negativo"],
    },
    altura: {
      type: Number,
      default: 0,
      min: [0, "Altura não pode ser negativo"],
    },
    idade: {
      type: Number,
      default: 0,
      min: [0, "Idade não pode ser negativo"],
    },
    senha: {
      type: String,
      required: true,
    },

    // 🔽 Campos novos
    resetToken: {
      type: String,
    },
    tokenExpiration: {
      type: Date,
    },
  },
  { timestamps: true }
);

UserSchema.pre("findOneAndUpdate", function (next) {
  this.setOptions({ runValidators: true });
  next();
});
UserSchema.pre("updateOne", function (next) {
  this.setOptions({ runValidators: true });
  next();
});
UserSchema.pre("updateMany", function (next) {
  this.setOptions({ runValidators: true });
  next();
});

module.exports = mongoose.model("User", UserSchema);
