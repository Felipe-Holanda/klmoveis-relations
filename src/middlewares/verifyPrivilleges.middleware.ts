import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import { userRepository } from '../data-source';

export default async function verifyPrivilleges(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const { id } = req.body.user;
        if (!id) throw new AppError('Invalid Token', 401)
        const certifiedUser = await userRepository.findOneBy({ id })
        if (certifiedUser.isAdm !== true) throw new AppError('Unauthorized', 403)
        return next();
    } catch (err) {
        return res.status(err.statusCode || 403).json({ message: err.message });
    }
}