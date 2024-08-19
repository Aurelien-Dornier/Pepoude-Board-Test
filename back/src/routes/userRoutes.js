import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticateToken } from "../middlewares/mdwAuth.js";
import * as userControllers from "../controllers/userControllers.js";

export const router = Router();

//ADMIN fetch all users
router.get("/users", authenticateToken, ctrlWrapper(userControllers.getAllUsers));
//ADMIN get user by name
router.get("/users/:name", authenticateToken, ctrlWrapper(userControllers.getUserByName));

//AUTH login user
router.post("/login", ctrlWrapper(userControllers.loginUser));
//AUTH register user
router.post("/register", ctrlWrapper(userControllers.registerUser));
