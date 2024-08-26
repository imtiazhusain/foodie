import { food_list } from "@/assets/assets";
import React, { useState } from "react";
import FoodItem from "./FoodItem";
const FoodItems = () => {
  const [addToCartClicked, setAddToCartClicked] = useState(false);

  const handleAddToCardClicked = () => {
    setAddToCartClicked((pre) => !pre);
  };
  return (
    <div>
      <h2 className="font-bold text-lg lg:text-xl mt-6">Top Dishes </h2>
      <div className="mt-16  grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))]    gap-y-6 gap-x-3 place-content-center w-full place-items-center ">
        {food_list.map((food) => (
          <FoodItem
            food={food}
            addToCartClicked={addToCartClicked}
            handleAddToCardClicked={handleAddToCardClicked}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodItems;
