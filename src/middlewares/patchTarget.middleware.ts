import { Request, Response, NextFunction } from 'express';
import { userRepository } from '../data-source';
import { AppError } from '../errors';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

//Este Middleware garante que o patch só pode ser feito por/em um usuário elegível.
// que o padrão SOLID me perdoe...

export default async function patchTarget(req: Request, res: Response, next: NextFunction) {
    try {
        //Coleta o UUID parametrado e verifica se é válido
        const reqId = req.params.id;
        if (!reqId) throw new AppError('Missing target id', 400)

        //Coleta o Token parametrado, e caso seja nulo o mesmo retorna um erro
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined;
        if (!token) throw new AppError('Missing authorization headers', 401)

        //Obtem o ID do usuário a partir do token e verifica se é válido
        const { id } = await jwt.verify(token, process.env.SECRET_KEY);
        if (!id) throw new AppError('Invalid Token', 403);

        //Verifica se os parametros são válidos no contexto da aplicação
        const user = await userRepository.findOneBy({ id }); // Obtem o usuário a partir do ID
        const targetUser = await userRepository.findOneBy({ id: reqId }); // Obtem o usuário "alvo" a partir do ID
        if (!targetUser) throw new AppError('User does not exist', 404) // Verifica se o usuário "alvo" existe
        if (targetUser.isActive === false && user.isAdm === false) throw new AppError('User not found', 401) // Verifica se o usuário "alvo" está ativo

        // Verifica se o usuário é o "alvo" ou um administrador
        if (user.id !== reqId && user.isAdm === false) throw new AppError('You cant perform this action', 401)
        if (user.id === reqId || user.isAdm === true) return next()
    } catch (err) {
        return res.status(err.status || 400).json({ message: err.message })
    }
}