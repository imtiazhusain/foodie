import React from "react";

const FoodItem = ({ addToCartClicked, handleAddToCardClicked, food }) => {
  console.log(food);
  return (
    <div
      className="rounded-md h-[330px] bg-white max-w-[250px] shadow-md transition-all duration-300 animate-fadeIn  "
      key={food._id}
    >
      <div className="relative">
        <img src={food.image} alt={food.name} className="w-full rounded-t-md" />
        {addToCartClicked ? (
          <div
            className="absolute bottom-3 right-4 h-7 w-18 rounded-full bg-white grid place-content-center font-medium p-1"
            onClick={handleAddToCardClicked}
            onMouseLeave={handleAddToCardClicked}
          >
            <div className="flex gap-1 justify-evenly">
              <button
                className=" h-6 w-6 rounded-full bg-red-50 text-red-700 grid place-content-center font-medium     items-center r  px-2 py-1 text-xs   ring-1 ring-inset ring-red-600/10"
                onClick={handleAddToCardClicked}
              >
                -
              </button>
              <div
                className="  h-6 w-6  bg-white grid place-content-center font-medium text-xs"
                onClick={handleAddToCardClicked}
              >
                1
              </div>
              <button
                className=" h-6 w-6 rounded-full bg-green-100 text-green-300 grid place-content-center font-medium items-center r  px-2 py-1 text-xs   ring-1 ring-inset ring-green-600/20"
                onClick={handleAddToCardClicked}
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <button
            className="absolute bottom-3 right-4 h-6 w-6 rounded-full bg-white grid place-content-center font-medium"
            onClick={handleAddToCardClicked}
          >
            +
          </button>
        )}
      </div>
      <div className="px-4 py-6 space-y-2">
        <div className="flex justify-between">
          <h2 className="font-semibold">{food.name}</h2>
          <h2 className="text-orange-500 font-semibold">${food.price}</h2>
        </div>
        <h2 className="text-gray-400 text-sm">{food.description}</h2>
      </div>
    </div>
  );
};

export default FoodItem;
