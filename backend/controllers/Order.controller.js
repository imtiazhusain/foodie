import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../config/index.js";
import orderModel from "../models/Order.model.js";
import userModel from "../models/User.model.js";
const stripe = new Stripe(STRIPE_SECRET_KEY);

class OrderController {
  static placeOrder = async (req, res, next) => {
    try {
      const FRONTEND_URL = "http://localhost:5173";
      const { items, amount, address } = req.body;
      const newOrder = new orderModel({
        user_id: req.user._id,
        items,
        amount,
        address,
      });

      const order = await newOrder.save();

      const line_items = items.map((item) => ({
        price_data: {
          currency: "pkr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100 * 275,
        },
        quantity: item.quantity,
      }));
      line_items.push({
        price_data: {
          currency: "pkr",
          product_data: {
            name: "Delivery charges",
          },
          unit_amount: 2 * 100 * 275,
        },
        quantity: 1,
      });

      console.log(line_items);

      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        success_url: `${FRONTEND_URL}/verify-order?success=true&orderId=${newOrder._id}`,
        cancel_url: `${FRONTEND_URL}/verify-order?success=false&orderId=${newOrder._id}`,
      });

      return res.status(200).json({
        success: "true",
        session_url: session.url,
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };

  static verifyOrder = async (req, res, next) => {
    try {
      const { orderId, success } = req.body;
      try {
        if (success == "true") {
          await orderModel.findByIdAndUpdate(orderId, { payment: true });
          const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            { cart_data: {} },
            { new: true }
          );
          return res.status(200).json({
            success: "success",
            message: "Order completed successfully",
          });
        } else {
          await orderModel.findByIdAndDelete(orderId);
          res.json({
            success: "fail",
            message: "Order failed  please try again",
          });
        }
      } catch (error) {}
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };

  static getUserOrders = async (req, res, next) => {
    try {
      let ordersData = await orderModel
        .find({ user_id: req.user._id })
        .populate({ path: "user_id", select: "name profile_pic email" });
      console.log(ordersData);
      return res.status(200).json({ status: "success", data: ordersData });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };
}

export default OrderController;
