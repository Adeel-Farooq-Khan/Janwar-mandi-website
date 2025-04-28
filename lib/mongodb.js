// lib/mongodb.js
import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB() {

  if (isConnected) return;
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "janwarmandi", // ✅ replace with your actual DB name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to database");
  }
  
}

