import express from "express";
import { logIn, signUp } from "../controllers/auth.user.controller";
import { validateReqBody } from "../middleware/validator.middleware";
import { createUserBodySchema, LoginSchema } from "../schema/user.schema";

const router = express();

router.post("/signup", validateReqBody(createUserBodySchema), signUp);

router.post("/login", validateReqBody(LoginSchema), logIn);

export default router;
