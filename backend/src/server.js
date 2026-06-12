import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { loggerMiddleware } from "./middleware/loggerMiddleware.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json()); //reads JSON body
app.use(loggerMiddleware); //Custom Logger Middleware

app.use("/api/users", userRoutes);

let users = [];
let projects = [];

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Sever is running on port: 5000");
});
