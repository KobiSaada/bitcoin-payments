import { connectToDB } from '../apps/backend-api/src/config/db';
import Payment from '../apps/backend-api/src/models/payment.model';

async function migrate() {
  try {
    await connectToDB();

    const payment = await Payment.create({
      merchantId: 'merchant_abc123',
      usdAmount: 100,
      btcAmount: 0.0023,
      btcAddress: '1BitcoinAddressExample',
      rateLockedAt: new Date(),
    });

    console.log('✅ Created payment document:', payment);
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    // הפרד את החיבור רק אם צריך, לא חובה לסגור את החיבור כל פעם במיגרציה
    // await mongoose.disconnect();
  }
}

migrate();
