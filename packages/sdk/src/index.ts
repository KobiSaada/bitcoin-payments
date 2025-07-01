// sdk/src/index.ts
import axios from 'axios';
import type { Payment } from '../../types';

export const createPayment = async (merchantId: string, usdAmount: number): Promise<Payment> => {
  const response = await axios.post('/api/payments/create', { merchantId, usdAmount });
  return response.data;
};

export const getPaymentStatus = async (paymentId: string): Promise<Payment> => {
  const response = await axios.get(`/api/payments/${paymentId}`);
  return response.data;
};
