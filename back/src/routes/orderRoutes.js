import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticateToken } from "../middlewares/mdwAuth.js";

import * as orderControllers from "../controllers/orderControllers.js";

export const router = Router();

// Get all orders with pagination and filtering
router.get("/orders", ctrlWrapper(orderControllers.getAllOrders));
