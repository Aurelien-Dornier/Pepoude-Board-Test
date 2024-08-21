import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticateToken } from "../middlewares/mdwAuth.js";

import * as orderControllers from "../controllers/orderControllers.js";

export const router = Router();

// Get all orders with pagination and filtering
router.get("/orders", authenticateToken, ctrlWrapper(orderControllers.getAllOrders));
// Get order by id
router.get("/orders/:id", authenticateToken, ctrlWrapper(orderControllers.getOrderById));
// Create order
router.post("/orders", authenticateToken, ctrlWrapper(orderControllers.creatOrder));
// Update order
router.patch("/orders/:id", authenticateToken, ctrlWrapper(orderControllers.updateOrder));
// Delete order
router.delete("/orders/:id", authenticateToken, ctrlWrapper(orderControllers.deleteOrder));
// Get order statistics
router.get(
  "/orders/statistics",
  authenticateToken,
  ctrlWrapper(orderControllers.getOrderStatistics)
);
