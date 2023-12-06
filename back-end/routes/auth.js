import express from "express";
import { register, login } from "../controllers/auth";

const authRouter = express.Router();

authRouter.post("/auth/login", login);
authRouter.post("/auth/register", register);

export default authRouter;
