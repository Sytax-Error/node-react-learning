import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
// import { loggerMiddleware } from "./middleware/loggerMiddleware.js";
import dotenv from "dotenv";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import taskRoutes from "./routes/taskRoutes.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import smsRoutes from "./routes/smsRoutes.js";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { env } from "./config/env.js";
import morgan from "morgan";
import apiRoutes from "./routes/index.js";
import compression from "compression";

dotenv.config(); // env config
connectDB();
const app = express(); // create app
app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  }),
); // cors
app.use(helmet()); // Helmet adds safer HTTP headers automatically.
app.use(compression()); // Api response compression
app.use(express.json()); //reads JSON body
app.use("/uploads", express.static("uploads")); // make uploads folder static for browser access
// app.use(loggerMiddleware); //Custom Logger Middleware
app.use(cookieParser());

if (env.nodeEnv === "development") {
  app.use(
    morgan(":method :url :status :response-time ms - :res[content-length]"),
  );
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(env.apiPrefix, apiRoutes);

app.use(notFoundMiddleware); // not found middleware
app.use(errorMiddleware); // errorMiddleware

const PORT = env.port || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
