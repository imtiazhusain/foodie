import mongoose from "mongoose";
import CustomErrorHandler from "../middlewares/errors/customErrorHandler";
import userModel from "../models/User.model";

class CartController {
  static addItemToCart = async (req, res, next) => {
    try {
      const { item_id } = req.params;
      const isValidID = mongoose.Types.ObjectId.isValid(item_id);
      if (!isValidID) {
        return CustomErrorHandler.invalidId("Invalid cart item ID");
      }
      const userData = await userModel.findById(req.user._id);
      const cartData = userData.cart_data;
      if (!userData) {
        return CustomErrorHandler.notFound("User not Found");
      }
      if (!cartData[item_id]) {
        cartData[item_id] = 1;
      } else {
        cartData[item_id] += 1;
      }
      await userModel.findByIdAndUpdate(req.user._id, { cart_data: cartData });
      return res
        .status(200)
        .json({ status: "success", message: "Item Added to cart" });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };

  static removeItemFromCart = async (req, res, next) => {
    try {
      const { item_id } = req.params;
      const isValidID = mongoose.Types.ObjectId.isValid(item_id);
      if (!isValidID) {
        return CustomErrorHandler.invalidId("Invalid cart item ID");
      }
      const userData = await userModel.findById(req.user._id);
      const cartData = userData.cart_data;
      if (!userData) {
        return CustomErrorHandler.notFound("User not Found");
      }
      if (!cartData[item_id])
        return CustomErrorHandler.notFound("Cart Item not found");
      if (!cartData[item_id] > 0) {
        cartData[item_id] -= 1;
      } else {
        delete cartData[item_id];
      }
      await userModel.findByIdAndUpdate(req.user._id, { cart_data: cartData });
      return res
        .status(200)
        .json({ status: "success", message: "Item Added to cart" });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };

  static getCartData = async (req, res, next) => {
    try {
      const userData = await userModel.findById(req.user._id);
      const cartData = userData.cart_data;

      return res.status(200).json({ status: "success", data: cartData });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };
}

export default CartController;
