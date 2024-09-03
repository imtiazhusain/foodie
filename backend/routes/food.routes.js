import express from "express";
import upload from "../middlewares/multer.js";

const router = express.Router();
import FoodController from "../controllers/Food.controller.js";
import auth, { isAdmin } from "../middlewares/auth.js";

// admin routes

router.post(
  "/add_item",
  auth,
  isAdmin,
  upload.single("image"),
  FoodController.storeNewFoodItem
);
router.get(
  "/get_all_food_item",
  // auth, // middleware commented because this api route is also used in dashboard
  // isAdmin,  // middleware commented because this api route is also used in dashboard
  FoodController.listAllFoodItems
);
router.delete(
  "/delete_food_item/:item_id",
  auth,
  isAdmin,
  FoodController.removeFoodItem
);
export default router;
