import { Request, Response, NextFunction } from 'express';
import { userRepository } from '../data-source';
import { AppError } from '../errors';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export default async function patchTarget(req: Request, res: Response, next: NextFunction) {
    try {
        const reqId = req.params.id;
        if (!reqId) throw new AppError('Missing target id', 400)
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined;
        if (!token) throw new AppError('Missing authorization headers', 401)
        const { id } = await jwt.verify(token, process.env.SECRET_KEY);
        if (!id) throw new AppError('Invalid Token', 403);
        const user = await userRepository.findOneBy({ id });
        const targetUser = await userRepository.findOneBy({ id: reqId });
        if (!targetUser) throw new AppError('User does not exist', 404)
        if (targetUser.isActive === false && user.isAdm === false) throw new AppError('User not found', 401)
        if (user.id !== reqId && user.isAdm === false) throw new AppError('You cant perform this action', 401)
        if (user.id === reqId || user.isAdm === true) return next()
    } catch (err) {
        return res.status(err.status || 400).json({ message: err.message })
    }
}