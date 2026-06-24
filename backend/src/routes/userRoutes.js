import express from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  updateProfileImage,
} from "../controllers/userController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import {
  validateCreateUserBody,
  validateUpdateUserBody,
} from "../middleware/validationMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.patch(
  "/profile-image",
  protect,
  upload.single("file"),
  updateProfileImage,
);
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
