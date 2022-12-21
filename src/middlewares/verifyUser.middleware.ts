import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import { userRepository } from '../data-source';

export default async function verifyUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.body.user;
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 400).json({ message: err.message });
    }
}