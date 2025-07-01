// app.ts
import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/payment.routes';

import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/payments', paymentRoutes);
app.use(errorHandler);

export default app;


