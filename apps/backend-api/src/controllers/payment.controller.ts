// payment.controller.ts - handles incoming HTTP requests for payments
import { Request, Response, NextFunction } from 'express';
import createPayment, { getPaymentStatus, confirmPayment } from '../services/payment.service';
import Payment from '../models/payment.model';
const handleCreatePayment = (req: Request, res: Response, next: NextFunction): void => {
  (async () => {
    try {
      const { merchantId, usdAmount } = req.body;

      if (!merchantId || !usdAmount) {
        res.status(400).json({ message: 'merchantId and usdAmount are required' });
        return;
      }

      const payment = await createPayment(merchantId, usdAmount);

      res.status(201).json({
        paymentId: payment._id,
        btcAddress: payment.btcAddress,
        btcAmount: payment.btcAmount,
        usdAmount: payment.usdAmount,
        expiresAt: new Date(new Date(payment.rateLockedAt).getTime() + 10 * 60 * 1000),
        status: payment.status
      });
    } catch (error) {
      console.error('Error creating payment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })();
};

const handleGetPaymentStatus = (req: Request, res: Response, next: NextFunction): void => {
  (async () => {
    try {
      const paymentId = req.params.id;
      const payment = await getPaymentStatus(paymentId);

      if (!payment) {
        res.status(404).json({ message: 'Payment not found' });
        return;
      }

      res.status(200).json({
        paymentId: payment._id,
        btcAddress: payment.btcAddress,
        btcAmount: payment.btcAmount,
        usdAmount: payment.usdAmount,
        status: payment.status,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
        txHash: payment.txHash || null
      });
    } catch (error) {
      console.error('Error fetching payment status:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })();
};

const handleConfirmPayment = (req: Request, res: Response, next: NextFunction): void => {
  (async () => {
    try {
      const { btcAddress, txHash } = req.body;
      if (!btcAddress || !txHash) {
        res.status(400).json({ message: 'btcAddress and txHash are required' });
        return;
      }

      const payment = await confirmPayment(btcAddress, txHash);
      if (!payment) {
        res.status(404).json({ message: 'Payment not found' });
        return;
      }

      res.status(200).json({
        message: 'Payment confirmed',
        paymentId: payment._id,
        status: payment.status,
        txHash: payment.txHash
      });
    } catch (error) {
      console.error('Error confirming payment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })();
};
// Removed duplicate declaration of handleGetAllPayments
export const handleGetAllPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments' });
  }
};

export {
  handleCreatePayment,
  handleGetPaymentStatus,
  handleConfirmPayment
};
