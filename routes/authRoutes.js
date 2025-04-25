const express = require("express");
const authenticate = require("../middleware/authMiddleware"); // Importando o middleware de autenticação
const router = express.Router();
const {
  register,
  login,
  deleteUser,
  updateUser,
  forgotPassword,
  addWorkout,
  listWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/authController");

// Usando as funções do controlador
router.post("/register", register);
router.post("/login", login);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUser/:id", updateUser);
router.post("/forgot-password", forgotPassword);

// Rotas para treinos
router.post("/add-workout", authenticate, addWorkout);
router.get("/list-workouts", authenticate, listWorkouts);
router.delete("/delete-workout/:id", authenticate, deleteWorkout);
router.put("/update-workout/:id", authenticate, updateWorkout);

module.exports = router;
