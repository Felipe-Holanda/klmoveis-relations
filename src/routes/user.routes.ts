import { Router } from 'express';

//Middlewares
import verifyToken from '../middlewares/verifyToken.middleware';
import ensureUnique from '../middlewares/ensureUnique.middleware';
import verifyPrivilleges from '../middlewares/verifyPrivilleges.middleware';
import verifyId from '../middlewares/verifyId.middleware';
import verifyPatch from '../middlewares/verifyPatch.middleware';
import patchTarget from '../middlewares/patchTarget.middleware';
//Serializers & Schemas
import shapeVerify from '../schemas/shapeVerify.serializer';
import { deleteUserSchema, updateUserSchema, registerSchema } from '../schemas/schemas';

//Controllers
import { createUserController, listUserController, editUserController, deleteUserController } from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/', shapeVerify(registerSchema), ensureUnique, createUserController);
userRouter.get('/', verifyToken, verifyPrivilleges, listUserController);
userRouter.delete('/:id', shapeVerify(deleteUserSchema), verifyToken, verifyId, verifyPrivilleges, deleteUserController);
userRouter.patch('/:id', shapeVerify(updateUserSchema), verifyPatch, verifyToken, patchTarget, editUserController);

export default userRouter;