// apps/blockchain-watcher/src/index.ts
import dotenv from 'dotenv';
import connectToDB from './db';
import { startWatcher } from './watcher';

dotenv.config();

const bootstrap = async () => {
  try {
    await connectToDB();
    console.log('🚀 Starting Blockchain Watcher...');
    await startWatcher();
  } catch (error) {
    console.error('❌ Watcher failed to start:', error);
    process.exit(1);
  }
};

bootstrap();
