import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
});

export const registerSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    isAdm: yup.boolean()
});

export const updateUserSchema = yup.object().shape({
    uuid: yup.string().required().matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
});

export const deleteUserSchema = yup.object().shape({
    uuid: yup.string().required().matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
});

// interfaces 

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    name: string;
    email: string;
    password: string;
    isAdm: boolean;
}

export interface IUpdateUser {
    uuid: string;
    name?: string;
    email?: string;
    password?: string;
}