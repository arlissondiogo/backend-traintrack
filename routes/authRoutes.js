const express = require("express");
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
router.post("/add-workout", addWorkout);
router.get("/list-workouts", listWorkouts);
router.delete("/delete-workout/:id", deleteWorkout);
router.put("/update-workout/:id", updateWorkout);

module.exports = router;
