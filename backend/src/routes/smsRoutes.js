import express from "express";
import { sendTestSms } from "../controllers/smsController.js";

const routes = express.Router();

routes.post("/smsTest", sendTestSms);

export default routes;
