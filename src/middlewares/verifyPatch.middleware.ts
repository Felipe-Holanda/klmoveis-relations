import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';

export default async function verifyPatch(req: Request, res: Response, next: NextFunction) {
    try {
        const keys = Object.keys(req.body)
        if (keys.indexOf('id') !== -1) throw new AppError("Can't update 'id' field", 401)
        if (keys.indexOf('isActive') !== -1) throw new AppError("Can't update 'isActive' field", 401)
        if (keys.indexOf('isAdm') !== -1) throw new AppError("Can't update 'isAdm' field", 401)
        return next();
    } catch (error) {
        return res.status(error.status).json({ message: error.message })
    }
}