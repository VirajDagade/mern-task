import mongoose from "mongoose";

const connectDB = async (mongoUri) => {
  if (!mongoUri)
    throw new Error("MONGO_URI is not defined in environment variables");
  mongoose.set("strictQuery", false);
  await mongoose.connect(mongoUri, {
    // options optional in modern mongoose
  });
  console.log("MongoDB connected");
};

export default connectDB;
