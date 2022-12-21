import { userRepository } from "../../data-source";
import jwt from "jsonwebtoken";
import 'dotenv/config';

export const loginService = async (data): Promise<string> => {
    const user = await userRepository.findOne({ where: { email: data.email } });
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '3h' });
    return token;
}