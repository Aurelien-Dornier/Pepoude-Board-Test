import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticateToken } from "../middlewares/mdwAuth.js";

import * as categoryControllers from "../controllers/categoryControllers.js";

export const router = Router();

// Add authenticateToken to all routes
router.use(authenticateToken);

router
  .route("/")
  .post(ctrlWrapper(categoryControllers.createCategory)) // create category
  .get(ctrlWrapper(categoryControllers.getAllCategories)); // get all categories

router.route("/search").get(ctrlWrapper(categoryControllers.getCategoryByName)); // search by name
router.route("/statistics").get(ctrlWrapper(categoryControllers.getCategoryStatistics));
router
  .route("/:id")
  .patch(ctrlWrapper(categoryControllers.updateCategory)) // update category
  .get(ctrlWrapper(categoryControllers.getCategoryById)) // get category by id
  .delete(ctrlWrapper(categoryControllers.deleteCategory)); // delete category
