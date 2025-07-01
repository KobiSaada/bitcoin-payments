// db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log('✅ Already connected to MongoDB');
    return;
  }
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      family: 4,
    });
    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};

export default connectToDB;
