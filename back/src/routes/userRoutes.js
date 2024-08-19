import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticateToken } from "../middlewares/mdwAuth.js";

import * as userControllers from "../controllers/userControllers.js";

export const router = Router();

//admin fetch all users
router.get("/users", authenticateToken, ctrlWrapper(userControllers.getAllUsers));
//admin get user by name
router.get("/:name", authenticateToken, ctrlWrapper(userControllers.getUserByName));

//login user
router.post("/login", ctrlWrapper(userControllers.loginUser));
//register user
router.post("/register", ctrlWrapper(userControllers.registerUser));
