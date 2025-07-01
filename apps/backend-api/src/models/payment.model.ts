// payment.model.ts
import mongoose from '../config/db'; // משתמש במופע mongoose מהחיבור

import { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  merchantId: string;
  usdAmount: number;
  btcAmount: number;
  btcAddress: string;
  status: 'pending' | 'confirmed' | 'failed';
  rateLockedAt: Date;
  txHash?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const paymentSchema = new Schema<IPayment>({
  merchantId: { type: String, required: true },
  usdAmount: { type: Number, required: true },
  btcAmount: { type: Number, required: true },
  btcAddress: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'failed'], default: 'pending' },
  rateLockedAt: { type: Date, required: true },
  txHash: { type: String }
}, { timestamps: true });

const Payment = mongoose.models.Payment || mongoose.model<IPayment>('Payment', paymentSchema);

export default Payment;
