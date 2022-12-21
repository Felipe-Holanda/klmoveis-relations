import { userRepository } from "../../data-source";
import { User } from "../../entities/user.entity";

export const createUserService = async (data) => {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    user.isAdm = data.isAdm ? data.isAdm : false;
    const newUser = await userRepository.save(user);
    return { ...user, password: undefined };
}