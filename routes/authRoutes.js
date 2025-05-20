const express = require("express");
const router = express.Router();
const {
  register,
  login,
  deleteUser,
  updateUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUser/:id", updateUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
exports.resetPassword = resetPassword;
