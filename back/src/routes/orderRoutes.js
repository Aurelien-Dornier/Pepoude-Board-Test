import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticateToken } from "../middlewares/mdwAuth.js";

import * as orderControllers from "../controllers/orderControllers.js";

export const router = Router();

// Get all orders with pagination and filtering
router.get("/orders", authenticateToken, ctrlWrapper(orderControllers.getAllOrders));
// Get order by id
router.get("/order/:id", authenticateToken, ctrlWrapper(orderControllers.getOrderById));
// Create order
router.post("/create/order", orderControllers.creatOrder);
// Update order
router.patch("/update/order/:id", ctrlWrapper(orderControllers.updateOrder));
// Delete order
router.delete("/delete/order/:id", ctrlWrapper(orderControllers.deleteOrder));
// Get order statistics
router.get(
  "/orders/statistics",

  ctrlWrapper(orderControllers.getOrderStatistics)
);
