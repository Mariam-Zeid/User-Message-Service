import { Router } from "express";
import { login, signup } from "./auth.controllers.js";
import { validate } from "../../middlewares/validation.js";
import {
  loginValidationSchema,
  signupValidationSchema,
} from "./auth.validations.js";

const authRouter = Router();

authRouter.post("/signup", validate(signupValidationSchema), signup);
authRouter.post("/login", validate(loginValidationSchema), login);
export default authRouter;
