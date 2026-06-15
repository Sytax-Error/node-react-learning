import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { loggerMiddleware } from "./middleware/loggerMiddleware.js";
import dotenv from "dotenv";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import taskRoutes from "./routes/taskRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config(); // env config
connectDB();
const app = express(); // create app
app.use(cors()); // cors
app.use(express.json()); //reads JSON body
app.use(loggerMiddleware); //Custom Logger Middleware

app.use("/api/users", userRoutes); // link routes
app.use("/api/tasks", taskRoutes);

let users = [];
let projects = [];

app.use(notFoundMiddleware); // not found middleware
app.use(errorMiddleware); // errorMiddleware

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
