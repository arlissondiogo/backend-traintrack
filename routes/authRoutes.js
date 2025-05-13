const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();
const {
  register,
  login,
  deleteUser,
  updateUser,
  forgotPassword,
  resetPassword,
  addWorkout,
  listWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUser/:id", updateUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/add-workout", authenticate, addWorkout);
router.get("/list-workouts", authenticate, listWorkouts);
router.delete("/delete-workout/:id", authenticate, deleteWorkout);
router.put("/update-workout/:id", authenticate, updateWorkout);

module.exports = router;
exports.resetPassword = resetPassword;
