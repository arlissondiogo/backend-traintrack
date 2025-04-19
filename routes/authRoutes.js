const express = require("express");
const router = express.Router();
const {
  register,
  login,
  deleteUser,
  update,
  forgotPassword,
} = require("../controllers/authController");

// Usando as funções do controlador
router.post("/register", register);
router.post("/login", login);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", update); // Atualização do usuário com possibilidade de mudar a senha
router.post("/forgot-password", forgotPassword); // Alterar senha (Esqueci minha senha)

module.exports = router;
