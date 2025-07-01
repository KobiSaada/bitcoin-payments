// payment.service.ts - logic to create a payment and calculate BTC amount
import { getCurrentBTCUSDPrice } from '../utils/btc';
import Payment, { IPayment } from '../models/payment.model';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

/**
 * Create a new BTC payment request
 * @param merchantId string - The ID of the merchant
 * @param usdAmount number - The USD amount to be paid
 * @returns Promise<IPayment>
 */
const createPayment = async (
  merchantId: string,
  usdAmount: number
): Promise<IPayment> => {
  const rate = await getCurrentBTCUSDPrice();
  const btcAmount = parseFloat((usdAmount / rate).toFixed(8));

  // For demo: generate a dummy BTC address (replace with actual wallet integration)
  const btcAddress = `mock-btc-address-${uuidv4()}`;

  const payment = new Payment({
    merchantId,
    usdAmount,
    btcAmount,
    btcAddress,
    rateLockedAt: new Date(),
    status: 'pending'
  });

  await payment.save();
  return payment;
};

/**
 * Get the status of an existing payment by ID
 * @param paymentId string
 * @returns Promise<IPayment | null>
 */
export const getPaymentStatus = async (paymentId: string): Promise<IPayment | null> => {
  return Payment.findById(paymentId);
};

/**
 * Simulated webhook to confirm BTC payment
 * In a real implementation, you would verify with a BTC node or payment processor
 */
export const confirmPayment = async (btcAddress: string, txHash: string): Promise<IPayment | null> => {
  const payment = await Payment.findOne({ btcAddress });
  if (!payment) return null;

  payment.status = 'confirmed';
  payment.txHash = txHash;
  await payment.save();

  return payment;
};

export default createPayment;
