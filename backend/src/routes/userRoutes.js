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

/**
 * @swagger
 * /api/v1/users/profile-image:
 *   patch:
 *     summary: Update logged-in user's profile image
 *     description: Uploads and updates the profile image of the currently logged-in user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file
 *     responses:
 *       200:
 *         description: Profile image updated successfully
 *       400:
 *         description: Image file is required or invalid file type
 *       401:
 *         description: Not authorized, token missing
 */
router.patch(
  "/profile-image",
  protect,
  upload.single("file"),
  updateProfileImage,
);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     description: Returns all users with pagination, search, and sorting.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           example: 10
 *         description: Number of users per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: admin
 *         description: Search by name, email, or role
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: createdAt
 *         description: Field used for sorting
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           example: desc
 *         description: Sorting order, asc or desc
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       401:
 *         description: Not authorized, token missing
 *       403:
 *         description: You are not allowed to access this resource
 */
router.get("/", protect, authorizeRoles("admin"), getUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Returns a single user by MongoDB user ID.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB user ID
 *         example: 665f1a2b3c4d5e6f78901234
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       401:
 *         description: Not authorized, token missing
 *       403:
 *         description: You are not allowed to access this resource
 *       404:
 *         description: User not found
 */
router.get("/:id", protect, authorizeRoles("admin"), getUserById);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create new user
 *     description: Creates a new user. This API is usually used by admin.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: john123
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorized, token missing
 *       403:
 *         description: You are not allowed to access this resource
 *       409:
 *         description: User already exists
 */
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  validateCreateUserBody,
  createUser,
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Updates an existing user by MongoDB user ID. This API is usually used by admin.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB user ID
 *         example: 665f1a2b3c4d5e6f78901234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated User
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorized, token missing
 *       403:
 *         description: You are not allowed to access this resource
 *       404:
 *         description: User not found
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  validateUpdateUserBody,
  updateUser,
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Deletes a user by MongoDB user ID. This API is usually used by admin.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB user ID
 *         example: 665f1a2b3c4d5e6f78901234
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Not authorized, token missing
 *       403:
 *         description: You are not allowed to access this resource
 *       404:
 *         description: User not found
 */
router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);

export default router;
