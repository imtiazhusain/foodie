import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});

const foodItemModel = mongoose.model("FoodItem", foodItemSchema);
export default foodItemModel;
