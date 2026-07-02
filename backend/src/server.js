import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { loggerMiddleware } from "./middleware/loggerMiddleware.js";
import dotenv from "dotenv";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import taskRoutes from "./routes/taskRoutes.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import emailRouter from "./routes/emailRoutes.js";
import smsRoutes from "./routes/smsRoutes.js";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { env } from "./config/env.js";

dotenv.config(); // env config
connectDB();
const app = express(); // create app
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
); // cors
app.use(helmet()); // Helmet adds safer HTTP headers automatically.
app.use(express.json()); //reads JSON body
app.use("/uploads", express.static("uploads")); // make uploads folder static for browser access
app.use(loggerMiddleware); //Custom Logger Middleware
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/users", userRoutes); // link routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/emails", emailRouter);
app.use("/api/sms", smsRoutes);

let users = [];
let projects = [];

app.use(notFoundMiddleware); // not found middleware
app.use(errorMiddleware); // errorMiddleware

const PORT = env.port || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
