import express from "express";
import auth from "../middlewares/auth.js";
import OrderController from "../controllers/Order.controller.js";

const router = express.Router();

router.post("/place_order", auth, OrderController.placeOrder);
router.post("/verify-order", auth, OrderController.verifyOrder);
router.get("/get_user_orders", auth, OrderController.getUserOrders);
router.get("/get_all_orders", auth, OrderController.getAllOrders);
router.post("/change_status", auth, OrderController.changeOrderStatus);
export default router;
