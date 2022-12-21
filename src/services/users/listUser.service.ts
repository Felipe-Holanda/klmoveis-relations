import { userRepository } from "../../data-source";
import { IUser } from "../../interfaces/users";


export const listUserService = async (): Promise<IUser[]> => {
    const users = await userRepository.find();
    //filters password from users
    let filteredUsers = users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdm: user.isAdm,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    })
    return filteredUsers;
}