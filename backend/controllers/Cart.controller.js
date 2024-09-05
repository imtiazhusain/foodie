import mongoose from "mongoose";
import CustomErrorHandler from "../middlewares/errors/customErrorHandler.js";
import userModel from "../models/User.model.js";

class CartController {
  // this will increase cart item quantity by 1
  static addItemToCart = async (req, res, next) => {
    try {
      const { itemId } = req.body;
      const isValidID = mongoose.Types.ObjectId.isValid(itemId);
      if (!isValidID) {
        return CustomErrorHandler.invalidId("Invalid cart item ID");
      }
      const userData = await userModel.findById(req.user._id);
      if (!userData) {
        return CustomErrorHandler.notFound("User not Found");
      }
      // Initialize cart_data if it doesn't exist
      if (!userData.cart_data) {
        userData.cart_data = new Map();
      }

      if (!userData.cart_data.get(itemId)) {
        userData.cart_data.set(itemId, 1);
      } else {
        userData.cart_data.set(itemId, userData.cart_data.get(itemId) + 1);
      }

      // Save the updated document
      await userData.save();

      return res
        .status(200)
        .json({ status: "success", message: "Item Added to cart" });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };

  //   this is reduce cart item quantity by 1
  static removeItemFromCart = async (req, res, next) => {
    try {
      const { itemId } = req.body;
      const isValidID = mongoose.Types.ObjectId.isValid(itemId);
      if (!isValidID) {
        return CustomErrorHandler.invalidId("Invalid cart item ID");
      }
      const userData = await userModel.findById(req.user._id);
      if (!userData) {
        return CustomErrorHandler.notFound("User not Found");
      }

      // Initialize cart_data if it doesn't exist
      if (!userData.cart_data) {
        userData.cart_data = new Map();
      }

      if (!userData.cart_data)
        return CustomErrorHandler.notFound("Cart Item not found");

      // Check if the item exists in the cart_data and if the value is greater than 0
      if (
        userData.cart_data.has(itemId) &&
        userData.cart_data.get(itemId) > 0
      ) {
        // Decrease the quantity by 1
        userData.cart_data.set(itemId, userData.cart_data.get(itemId) - 1);

        // If the quantity becomes 0, delete the item from the cart
        if (userData.cart_data.get(itemId) === 0) {
          userData.cart_data.delete(itemId);
        }
      }

      // Save the updated user document
      await userData.save();

      return res
        .status(200)
        .json({ status: "success", message: "Item Added to cart" });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };

  //   this will remove item form cart list
  static deleteItemFromCart = async (req, res, next) => {
    try {
      const { itemId } = req.body;
      const isValidID = mongoose.Types.ObjectId.isValid(itemId);
      if (!isValidID) {
        return CustomErrorHandler.invalidId("Invalid cart item ID");
      }
      const userData = await userModel.findById(req.user._id);
      if (!userData) {
        return CustomErrorHandler.notFound("User not Found");
      }

      // Initialize cart_data if it doesn't exist
      if (!userData.cart_data) {
        userData.cart_data = new Map();
      }

      if (!userData.cart_data)
        return CustomErrorHandler.notFound("Cart Item not found");

      userData.cart_data.delete(itemId);

      // Save the updated user document
      await userData.save();

      return res
        .status(200)
        .json({ status: "success", message: "Item deleted from cart" });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };

  static getCartData = async (req, res, next) => {
    try {
      const userData = await userModel.findById(req.user._id);

      // Initialize cart_data if it doesn't exist
      if (!userData.cart_data) {
        userData.cart_data = new Map();
      }
      const totalCartItems = userData.cart_data.size;

      return res.status(200).json({
        status: "success",
        data: { cartData: userData.cart_data, totalCartItems },
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };
}

export default CartController;
