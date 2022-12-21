import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import { userRepository } from '../data-source';

// Este Middleware verifica se o UUID enviado é válido no contexto da aplicação.

export default async function verifyId(req: Request, res: Response, next: NextFunction) {
    try {
        // Coleta o id do usuário, e caso seja nulo, retorna um erro.
        const { id } = req.params;
        if (!id) throw new AppError('User id is required.', 400);

        // Verifica se o usuário existe, e caso não exista, retorna um erro, se existir, continua.
        const user = await userRepository.findOneBy({ id });
        if (!user) throw new AppError('User not found.', 404);

        // Verifica se o usuário está ativo, e caso não esteja, retorna um erro, se estiver, continua.
        if (!user.isActive) throw new AppError('User does not exist', 400);
        return next()
    } catch (error) {
        return res.status(error.status).json({ message: error.message })
    }
}