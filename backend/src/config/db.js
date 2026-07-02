import mongoose from "mongoose";
import { env } from "./env.js";

mongoose.set("sanitizeFilter", true);

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(env.mongoUri);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};
