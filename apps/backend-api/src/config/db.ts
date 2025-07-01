// db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;

let cachedConnection: typeof mongoose | null = null;

export async function connectToDB() {
  if (cachedConnection) {
    // כבר מחובר
    return cachedConnection;
  }

  try {
    cachedConnection = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      family: 4,
    });
    console.log('✅ Connected to MongoDB');
    return cachedConnection;
  } catch (error) {
    cachedConnection = null;
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

export default mongoose;
