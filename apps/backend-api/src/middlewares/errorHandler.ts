// errorHandler.ts - centralized error handling middleware
import { Request, Response, NextFunction } from 'express';

/**
 * Global error handler middleware
 */
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
};

export default errorHandler;