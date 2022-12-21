import { Request, Response } from 'express';
import { createUserService } from '../services/users/createUser.service';
import { listUserService } from '../services/users/listUser.service';
import { editUserService } from '../services/users/editUser.service';
import { deleteUserService } from '../services/users/deleteUser.service';

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password, isAdm } = req.body;
    const user = await createUserService({ name, email, password, isAdm });
    return res.status(201).json(user);
};

export const listUserController = async (req: Request, res: Response): Promise<Response> => {
    const users = await listUserService();
    return res.status(200).json(users);
};

export const editUserController = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await editUserService(id, { name, email, password });

    return res.status(200).json(user);
};

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await deleteUserService(id);
    return res.status(204).send();
};