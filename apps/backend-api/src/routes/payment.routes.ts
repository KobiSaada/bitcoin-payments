// payment.routes.ts
import { Router } from 'express';
import {
  handleCreatePayment,
  handleGetPaymentStatus,
  handleConfirmPayment,
  handleGetAllPayments 
} from '../controllers/payment.controller';

const router = Router();

router.post('/create', handleCreatePayment);
router.get('/:id', handleGetPaymentStatus);
router.post('/confirm', handleConfirmPayment);
router.get('/', handleGetAllPayments); // 👈 חדש: מקבל את כל התשלומים

export default router;
