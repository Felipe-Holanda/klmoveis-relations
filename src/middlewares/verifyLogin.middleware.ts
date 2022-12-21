import { AppError } from "../errors";
import { Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";
import { userRepository } from "../data-source";

export const verifyLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await userRepository.findOneBy({ email });
        if (!user) throw new AppError("Wrong email or password", 403);
        const isMatch = await compare(password, user.password);
        if (!isMatch) throw new AppError("Wrong email or password", 403);
        req.body.user = user;
        return next();
    } catch (err) {
        return res.status(err.status || 400).json({ message: err.message });
    }
}