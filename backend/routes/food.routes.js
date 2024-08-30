import express from "express";
import upload from "../middlewares/multer.js";

const router = express.Router();
import FoodController from "../controllers/Food.controller.js";

router.post(
  "/add_item",
  upload.single("image"),
  FoodController.storeNewFoodItem
);
router.get("/get_all_food_item", FoodController.listAllFoodItems);
router.delete("/delete_food_item/:item_id", FoodController.removeFoodItem);
export default router;
