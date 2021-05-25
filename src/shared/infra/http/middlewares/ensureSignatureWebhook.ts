import { Response, Request, NextFunction } from 'express';
import AppError from '@errors/AppError';

export default function ensureSignatureWebhook(req: Request, res: Response, next: NextFunction) {
  if(req.headers['x-forwarded-for'] === process.env.SIGNATURE_WEBHOOK_IP) {
    next()
  } else {
    throw new AppError("ip not allowed", 401);
  }
};
