import { userRepository } from "../../data-source";
import { IUser } from "../../interfaces/users";

export const editUserService = async (id, data): Promise<IUser> => {
    await (await userRepository.update(id, data));
    const user = await (await userRepository.findOneBy({ id }))
    let filteredUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdm: user.isAdm,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
    return filteredUser;
};