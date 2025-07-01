// server.ts - entry point to start the Express server
import mongoose from '../src/config/db'; // מחבר ל־mongoose המשותף
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bitcoin-payments';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB', err);
    process.exit(1);
  });
