import express from "express";
import { healthcheck } from "../controllers/healthController.js";

const router = express.Router();

router.get("/", healthcheck);

export default router;
