import mongoose from "mongoose";

export const validateObjectId = (id, resourceName) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(`Invalid ${resourceName} id`);
    error.statusCode = 400;
    throw error;
  }
};
