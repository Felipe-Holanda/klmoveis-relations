import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import { userRepository } from '../data-source';

// Este Middleware verifica se o usuário é um administrador

export default async function verifyPrivilleges(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        // Coleta o id do usuário, e caso seja nulo, retorna um erro.
        const { id } = req.body.user;
        if (!id) throw new AppError('Invalid Token', 401)

        // Verifica se o usuário é um administrador, e caso não seja, retorna um erro, se for, continua.
        const certifiedUser = await userRepository.findOneBy({ id })
        if (certifiedUser.isAdm !== true) throw new AppError('Unauthorized', 403)

        return next();
    } catch (err) {
        return res.status(err.statusCode || 403).json({ message: err.message });
    }
}