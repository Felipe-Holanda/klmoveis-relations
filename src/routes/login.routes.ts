import { Router } from "express";

import { loginController } from "../controllers/login.controllers";
import { verifyLogin } from "../middlewares/verifyLogin.middleware";
import shapeVerify from '../schemas/shapeVerify.serializer';
import { loginSchema } from "../schemas/schemas";

const loginRouter = Router();

loginRouter.post("/", shapeVerify(loginSchema), verifyLogin, loginController);

export default loginRouter;