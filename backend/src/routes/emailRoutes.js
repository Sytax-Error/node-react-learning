import express from "express";
import { sendTestEmailController } from "../controllers/emailController.js";

const router = express.Router();

router.post("/test", sendTestEmailController);

export default router;
