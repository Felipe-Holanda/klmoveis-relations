import { userRepository } from "../data-source";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";
import 'dotenv/config'

export default async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) throw new AppError('Missing authorization headers', 401);
        const { id } = await jwt.verify(token, process.env.SECRET_KEY) as { id: string };
        if (!id) throw new AppError('Invalid token', 401);
        const user = await userRepository.findOneBy({ id });
        if (!user) throw new AppError('Invalid token', 401);
        req.body.user = user;
        return next();
    } catch (err) {
        return res.status(err.statusCode || 401).json({ message: err.message || 'Invalid token' });
    }
}