import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import { userRepository } from '../data-source';

export default async function verifyId(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        if (!id) throw new AppError('User id is required.', 400);
        const user = await userRepository.findOneBy({ id });
        if (!user) throw new AppError('User not found.', 404);
        if (!user.isActive) throw new AppError('User does not exist', 400);
        return next()
    } catch (error) {
        return res.status(error.status).json({ message: error.message })
    }
}