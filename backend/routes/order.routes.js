import express from "express";
import auth from "../middlewares/auth.js";
import OrderController from "../controllers/Order.controller.js";

const router = express.Router();

router.post("/place_order", auth, OrderController.placeOrder);
router.post("/verify-order", auth, OrderController.verifyOrder);
router.get("/get_user_orders", auth, OrderController.getUserOrders);

export default router;
