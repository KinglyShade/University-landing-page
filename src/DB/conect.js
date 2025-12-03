import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// PRIORITY: Force use of .env variable
const URI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!URI) throw new Error("❌ FATAL: No connection string in .env");

export const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return mongoose.connection;
    console.log("Connect to:", URI.substring(0, 15) + "...");
    return await mongoose.connect(URI, { serverSelectionTimeoutMS: 5000 });
};