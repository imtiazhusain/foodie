import express from "express";

const router = express.Router();
import CartController from "../controllers/Cart.controller.js";
import auth from "../middlewares/auth.js";

router.post("/add_cart_item", auth, CartController.addItemToCart);
router.post("/remove_cart_item", auth, CartController.removeItemFromCart);
router.get("/get_cart_data", auth, CartController.getCartData);
router.post("/delete_cart_item", auth, CartController.deleteItemFromCart);
export default router;
