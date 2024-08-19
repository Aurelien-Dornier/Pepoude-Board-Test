import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticateToken } from "../middlewares/mdwAuth.js";

import * as userControllers from "../controllers/userControllers.js";

export const router = Router();

router.get("/users", authenticateToken, ctrlWrapper(userControllers.getAllUsers));
router.post("/login", ctrlWrapper(userControllers.loginUser));
router.post("/register", ctrlWrapper(userControllers.registerUser));
