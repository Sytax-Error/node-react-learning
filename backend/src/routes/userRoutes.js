import express from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import {
  validateCreateUserBody,
  validateUpdateUserBody,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), getUsers);
router.get("/:id", protect, authorizeRoles("admin"), getUserById);
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  validateCreateUserBody,
  createUser,
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  validateUpdateUserBody,
  updateUser,
);
router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);

export default router;
