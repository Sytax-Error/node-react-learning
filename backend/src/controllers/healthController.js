import { env } from "../config/env.js";
import { sendResponse } from "../utils/sendResponse.js";
import mongoose from "mongoose";

export const healthcheck = (req, res) => {
  sendResponse(res, 200, "Server is healthy", {
    status: "ok",
    environment: env.nodeEnv,
    uptime: `${Math.floor(process.uptime())} seconds`,
    timestamp: new Date().toISOString(),
    database: {
      status:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    },
  });
};
