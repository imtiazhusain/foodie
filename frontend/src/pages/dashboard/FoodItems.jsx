import React, { useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import { useSelector } from "react-redux";
import LoadingProducts from "./LoadingProducts";
import { toast } from "sonner";

const FoodItems = ({ category }) => {
  const { isLoading, isError, data } = useSelector(
    (state) => state.productsList
  );

  useEffect(() => {
    if (isError) toast.error("Something went wrong");
  }, [isError]);

  return (
    <div>
      <h2 className="font-bold text-lg lg:text-xl mt-6">Top Dishes </h2>
      <div className="mt-16  grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))]    gap-y-6 gap-x-5 lg:gap-x-8 place-content-center w-full place-items-center ">
        {isLoading ? (
          <LoadingProducts />
        ) : data?.length > 0 ? (
          data?.map((food) => {
            if (category === "All" || category === food.category)
              return <FoodItem key={food._id} food={food} />;
          })
        ) : (
          <span className="text-gray-500">No Data Found</span>
        )}
      </div>
    </div>
  );
};

export default FoodItems;
