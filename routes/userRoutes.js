const express = require("express");
const router = express.Router();
const {
  register,
  login,
  deleteUser,
  updateUser,
  forgotPassword,
  resetPassword,
  getUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.delete("/delete", authMiddleware, deleteUser);

router.put("/update", authMiddleware, updateUser);
router.put("/updateUser/:userId", authMiddleware, updateUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", authMiddleware, getUser);

module.exports = router;
