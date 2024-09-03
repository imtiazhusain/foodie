import express from "express";
import auth, { isAdmin } from "../middlewares/auth.js";
import OrderController from "../controllers/Order.controller.js";

const router = express.Router();

router.post("/place_order", auth, OrderController.placeOrder);
router.post("/verify-order", auth, OrderController.verifyOrder);
router.get("/get_user_orders", auth, OrderController.getUserOrders);
// admin routes
router.get("/get_all_orders", auth, isAdmin, OrderController.getAllOrders);
router.post("/change_status", auth, isAdmin, OrderController.changeOrderStatus);
export default router;
