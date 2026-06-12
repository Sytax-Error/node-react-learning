import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json()); //reads JSON body

app.use("/api/users", userRoutes);

let users = [];
let projects = [];

app.listen(5000, () => {
  console.log("Sever is running on port: 5000");
});
