const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();
const {
  addWorkout,
  listWorkouts,
  deleteWorkout,
  updateWorkout,
  getExerciciosUnicos,
} = require("../controllers/workoutController.js");

router.post("/add-workout", authenticate, addWorkout);
router.get("/list-workout", authenticate, listWorkouts);
router.delete("/delete-workout/:id", authenticate, deleteWorkout);
router.put("/update-workout/:id", authenticate, updateWorkout);
router.get("/exercicios", authenticate, getExerciciosUnicos);

module.exports = router;
