import { Response, Request, NextFunction } from 'express';
import AppError from '@errors/AppError';

export default function ensureSignatureWebhook(req: Request, res: Response, next: NextFunction) {
  next()
};
