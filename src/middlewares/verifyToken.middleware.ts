import { userRepository } from "../data-source";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";
import 'dotenv/config'

//Este Middleware verifica se o token é válido

export default async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        //Coleta o Token parametrado, e caso seja nulo o mesmo retorna um erro
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) throw new AppError('Missing authorization headers', 401);

        //Verifica se o token é válido, e caso seja, retorna o id do usuário, se não, um erro.
        const { id } = await jwt.verify(token, process.env.SECRET_KEY) as { id: string };
        if (!id) throw new AppError('Invalid token', 401);

        //Verifica se o usuário existe, e caso não exista, retorna um erro, se existir, salva o usuário.
        const user = await userRepository.findOneBy({ id });
        if (!user) throw new AppError('Invalid token', 401);
        req.body.user = user;

        return next();
    } catch (err) {
        return res.status(err.statusCode || 401).json({ message: err.message || 'Invalid token' });
    }
}