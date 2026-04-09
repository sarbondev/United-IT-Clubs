import mongoose from "mongoose";

export async function connectDatabase(connectionString) {
  return mongoose.connect(connectionString);
}
