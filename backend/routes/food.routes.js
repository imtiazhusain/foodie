import express from "express";
import upload from "../middlewares/multer";
const router = express.Router();
import FoodController from "../controllers/Food.controller";

router.post(
  "/add_item",
  upload.single("item_image"),
  FoodController.storeNewFoodItem
);
router.get("get_all_food_item", FoodController.listAllFoodItems);
router.delete("/remove_food_item", FoodController.removeFoodItem);
export default router;
