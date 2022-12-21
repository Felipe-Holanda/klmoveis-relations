import { Request, Response, NextFunction } from 'express';
import { userRepository } from '../data-source';
import { AppError } from '../errors';

// Este Middleware verifica se o e-mail já está em uso.

export default async function ensureUnique(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        // Coleta o e-mail do corpo da requisição
        const { email } = req.body;
        if (!email) throw new AppError('Email is required', 400);

        // Verifica se o e-mail já está em uso, e caso esteja, retorna um erro, se não, continua.
        const user = await userRepository.findOneBy({ email });
        if (user) throw new AppError('Email already in use', 400);

        return next();
    } catch (err) {
        return res.status(err.statusCode || 400).json({ message: err.message });
    }
}