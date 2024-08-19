import { Router } from "express";
import { router as userRouter } from "./userRoutes.js";
import { router as productRouter } from "./productRoutes.js";
export const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.use(userRouter);
router.use(productRouter);
