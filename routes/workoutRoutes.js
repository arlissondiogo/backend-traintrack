const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();
const {
  addExercise,
  listWorkouts,
  deleteExercise,
  updateExercise,
  getUniqueExercises,
} = require("../controllers/workoutController.js");

router.post("/add-exercise", authenticate, addExercise);
router.get("/list-workout", authenticate, listWorkouts);
router.delete("/delete-exercise/:id", authenticate, deleteExercise);
router.put("/update-exercise/:id", authenticate, updateExercise);
router.get("/exercise", authenticate, getUniqueExercises);

module.exports = router;
