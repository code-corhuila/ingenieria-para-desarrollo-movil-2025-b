import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";

const router = Router();

router.post("/checkout/:userId", OrderController.checkout);
router.put("/cancel/:orderId", OrderController.cancel);
router.get("/user/:userId", OrderController.getByUser);

export default router;
