import { Router } from "express";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import * as productControllers from "../controllers/productControllers.js";

export const router = Router();
//get all products
router.get("/products", ctrlWrapper(productControllers.getAllProducts));
// search product by name
router.get("/products/:name", ctrlWrapper(productControllers.getProductByName));
// get product by id
router.get("/product/:id", ctrlWrapper(productControllers.getProductById));
// create product
router.post("/product", ctrlWrapper(productControllers.createProduct));
// update product
router.put("/product/:id", ctrlWrapper(productControllers.updateProduct));
// delete product
router.delete("/product/:id", ctrlWrapper(productControllers.deleteProduct));
