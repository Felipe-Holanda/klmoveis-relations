import { userRepository } from "../../data-source";

export const deleteUserService = async (id): Promise<void> => {
    await userRepository.update(id, { isActive: false });
    return;
}
