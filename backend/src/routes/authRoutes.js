import express from "express";
import {
  getProfile,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  validateLoginBody,
  validateRegisterBody,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/register", validateRegisterBody, registerUser);
router.post("/login", validateLoginBody, loginUser);
router.get("/profile", protect, getProfile);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logoutUser);

export default router;
