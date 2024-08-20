import { Router } from "express";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import * as productControllers from "../controllers/productControllers.js";

export const router = Router();
//get all products
router.get("/products", ctrlWrapper(productControllers.getAllProducts));
// search product by name
router.get("/products/search", ctrlWrapper(productControllers.getProductByName));
// get product by id
router.get("/products/:id", ctrlWrapper(productControllers.getProductById));
// create product
router.post("/products", ctrlWrapper(productControllers.createProduct));
// update product
router.put("/products/:id", ctrlWrapper(productControllers.updateProduct));
// delete product
router.delete("/products/:id", ctrlWrapper(productControllers.deleteProduct));
