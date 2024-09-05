import { assets } from "@/assets/assets";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartWithAPI, removeCartItemWithAPI } from "@/slices/cartSlice";

const FoodItem = ({ addToCartClicked, handleAddToCardClicked, food }) => {
  const [itemCount, setItemCount] = useState(0);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  return (
    <div
      className="rounded-md h-[350px] xs:h-[330px] bg-white xs:max-w-[250px] max-w-[300px] shadow-md transition-all duration-300 animate-fadeIn  "
      key={food?._id}
    >
      <div className="relative">
        <div className="xs:w-[250px] bg-gray-200 xs:h-[194.44px] max-w-[300px]">
          <img
            src={food?.image}
            alt={food?.name}
            className="w-full rounded-t-md"
            loading="lazy"
          />
        </div>
        {cartItems[food?._id] ? (
          <div className="absolute bottom-3 right-4 h-7 w-18 rounded-full bg-white grid place-content-center font-medium p-1">
            <div className="flex gap-2 justify-evenly">
              <button
                className=" h-6 w-6 rounded-full bg-red-50 text-red-700 grid place-content-center font-medium     items-center r  px-2 py-1 text-xs   ring-1 ring-inset ring-red-600/10"
                onClick={() => dispatch(removeCartItemWithAPI(food?._id))}
              >
                <Minus size={15} />
              </button>

              <p>{cartItems[food?._id]}</p>
              <button
                className=" h-6 w-6 rounded-full bg-green-100 text-green-300 grid place-content-center font-medium items-center r  px-2 py-1 text-xs   ring-1 ring-inset ring-green-600/20"
                onClick={() => dispatch(addToCartWithAPI(food?._id))}
              >
                <Plus size={15} />
              </button>
            </div>
          </div>
        ) : (
          <button
            className="absolute bottom-3 right-4 h-6 w-6 rounded-full bg-white grid place-content-center font-medium"
            onClick={() => dispatch(addToCartWithAPI(food?._id))}
          >
            <Plus size={15} />
          </button>
        )}
      </div>
      <div className="px-4 py-6 space-y-2">
        <div className="flex justify-between">
          <h2 className="font-semibold">{food?.name}</h2>
          <h2 className="text-orange-500 font-semibold">${food?.price}</h2>
        </div>
        <h2 className="text-gray-400 text-sm">{food?.description}</h2>
      </div>
    </div>
  );
};

export default FoodItem;
