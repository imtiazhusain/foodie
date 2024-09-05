import mongoose from "mongoose";
import foodItemModel from "../models/FoodItem.model.js";
import JoiValidation from "../utils/joiValidation.js";
import CustomErrorHandler from "../middlewares/errors/customErrorHandler.js";
import HelperMethods from "../utils/helper.js";

class FoodController {
  static storeNewFoodItem = async (req, res, next) => {
    try {
      req.body.image = req?.file?.filename;

      const { image, name, description, category, price } = req.body;

      const { error } = JoiValidation.createFodItemValidation(req.body);

      if (error) {
        return next(error);
      }

      const storeFoodItem = new foodItemModel({
        name,
        description,
        category,
        price,
        image,
      });

      await storeFoodItem.save();

      return res.status(201).json({
        status: "success",
        message: "Food item added successfully",
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };
  static listAllFoodItems = async (req, res, next) => {
    try {
      const allFoodItems = await foodItemModel.find({});

      allFoodItems.forEach((item) => {
        // Check if item and image exist and if image does not start with 'http'
        if (item && item.image && !item.image.startsWith("http")) {
          // Update profile_pic by prefixing it with the SERVER_URL and the path to uploads
          item.image = `${process.env.SERVER_URL || ""}/images/uploads/${
            item.image
          }`;
        }
      });
      return res.status(200).json({
        status: true,
        data: allFoodItems,
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };

  static getFoodItem = async (req, res, next) => {
    try {
      const { item_id } = req.params;

      const isValidID = mongoose.Types.ObjectId.isValid(item_id);

      if (!isValidID) {
        return CustomErrorHandler.invalidId("Invalid item ID");
      }

      let itemData = await foodItemModel.findById(item_id);

      if (!itemData) return CustomErrorHandler.notFound("Food item not found");

      return res.status(200).json({
        status: "success",
        data: itemData,
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };

  static removeFoodItem = async (req, res, next) => {
    try {
      const { item_id } = req.params;
      const isValidID = mongoose.Types.ObjectId.isValid(item_id);

      if (!isValidID) {
        return CustomErrorHandler.invalidId("Invalid food item ID");
      }

      const item = await foodItemModel.findById(item_id);

      if (!item) return CustomErrorHandler.notFound("Item not Found");

      if (item?.image) {
        let fileName = item.image;
        HelperMethods.deleteFileIfExists(fileName);
      }
      await foodItemModel.findByIdAndDelete(item_id);

      return res.status(200).json({
        status: "success",
        message: "Food item deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };

  static editFoodItem = async (req, res, next) => {
    try {
      const { item_id } = req.params;

      const isValidID = mongoose.Types.ObjectId.isValid(item_id);

      if (!isValidID) {
        return CustomErrorHandler.invalidId("Invalid item ID");
      }

      if (req?.body?.image) {
        delete req.body.image;
      }

      const item_image = req?.file?.filename;

      const { name, description, category, price } = req.body;

      const { error } = JoiValidation.editFoodItemValidation(req.body);

      if (error) {
        return next(error);
      }

      const isItemExists = await foodItemModel.exists({ _id: item_id });
      if (!isItemExists)
        return CustomErrorHandler.notFound("Food item not found");

      let itemData = {
        name,
        description,
        category,
        price,
        ...(item_image && { image: item_image }),
      };

      await foodItemModel.findByIdAndUpdate(item_id, itemData);

      return res.status(200).json({
        status: "success",
        message: "Food Item updated",
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };
}

export default FoodController;
