import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticateToken } from "../middlewares/mdwAuth.js";

import * as orderControllers from "../controllers/orderControllers.js";

export const router = Router();

// Add authenticateToken to all routes
router.use(authenticateToken);

router
  .route("/")
  .get(ctrlWrapper(orderControllers.getAllOrders)) //with pagination & filtering
  .post(ctrlWrapper(orderControllers.creatOrder)); // create order

// Placer la route /statistics avant /:id
router.route("/statistics").get(ctrlWrapper(orderControllers.getOrderStatistics)); // Statistics

router
  .route("/:id")
  .get(ctrlWrapper(orderControllers.getOrderById)) // get order by id
  .patch(ctrlWrapper(orderControllers.updateOrder)) // update order
  .delete(ctrlWrapper(orderControllers.deleteOrder)); // delete order
