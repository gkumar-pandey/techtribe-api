import { Router } from "express";
import {
  loginController,
  signupController,
} from "../../../controllers/auth/auth.controller";
const authRoute = Router();

authRoute.post("/signup", signupController);
authRoute.post("/login", loginController);

export default authRoute;
