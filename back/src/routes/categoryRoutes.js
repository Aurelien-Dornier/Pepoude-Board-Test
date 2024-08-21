import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticateToken } from "../middlewares/mdwAuth.js";

import * as categoryControllers from "../controllers/categoryControllers.js";

export const router = Router();

// Add authenticateToken to all routes
router.use(authenticateToken);

router
  .route("/")
  .post(ctrlWrapper(categoryControllers.createCategory))
  .get(ctrlWrapper(categoryControllers.getAllCategories));

router.route("/search").get(ctrlWrapper(categoryControllers.getCategoryByName));

router.route("/:id").get(ctrlWrapper(categoryControllers.getCategoryById));
