// apps/blockchain-watcher/src/watcher.ts
import axios from 'axios';
import Payment from '../../backend-api/src/models/payment.model'; // נניח שאתה משתף את המודל
import connectToDB from './db';
import dotenv from 'dotenv';

dotenv.config();

const checkPayments = async () => {
  const pendingPayments = await Payment.find({ status: 'pending' });

  for (const payment of pendingPayments) {
    try {
      // דוגמה לשימוש ב-Blockchain.info או BlockCypher וכו׳
      const txCheckUrl = `https://api.blockcypher.com/v1/btc/main/addrs/${payment.btcAddress}`;
      interface TxCheckResponse {
        total_received: number;
        txrefs?: { tx_hash: string }[];
      }

      const { data } = await axios.get<TxCheckResponse>(txCheckUrl);

      const received = data.total_received / 1e8; // BTC instead of Satoshis
      if (received >= payment.btcAmount) {
        payment.status = 'confirmed';
        payment.txHash = data.txrefs?.[0]?.tx_hash || undefined;
        await payment.save();
        console.log(`✅ Payment ${payment._id} confirmed.`);
      }
    } catch (err) {
      const errorMessage = (err instanceof Error) ? err.message : 'Unknown error';
      console.error(`❌ Error checking address ${payment.btcAddress}:`, errorMessage);
    }
  }
};

export const startWatcher = async () => {
  await connectToDB();
  console.log('⏳ Starting BTC watcher...');

  setInterval(checkPayments, 60_000); // Every 60 seconds
};
