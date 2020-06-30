import { Response, Request, NextFunction } from 'express';
import AppError from '@errors/AppError';

export default function ensureRole(roleName: string) {
    return function (request: Request, response: Response, next: NextFunction) {
        // @ts-ignore
        if (request.user.role.name === roleName) {
            next();
        } else {
            throw new AppError('User without permission', 401);
        }
    };
}
