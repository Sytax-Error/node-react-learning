import express from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUsers);

router.post("/", protect, createUser);

router.get("/:id", protect, getUserById);

router.put("/:id", protect, updateUser);

router.delete("/:id", protect, deleteUser);

export default router;
