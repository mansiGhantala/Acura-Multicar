const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  refreshToken,
  getAllUsers,
  updateUserRole,
} = require("../controllers/auth-controller");

const { authMiddleware, isAdminMiddleware } = require("../middleware/auth-middleware"); 

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", authMiddleware, getUser);
router.post("/logout", logoutUser);
router.get("/refresh", refreshToken);
router.get("/all", authMiddleware, isAdminMiddleware, getAllUsers); 
router.patch("/role/:id", authMiddleware, isAdminMiddleware, updateUserRole); 

module.exports = router;
