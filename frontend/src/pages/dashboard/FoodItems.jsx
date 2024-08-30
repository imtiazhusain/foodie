import React, { useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/slices/foodListSlice";
import LoadingProducts from "./LoadingProducts";
import { Skeleton } from "@/components/ui/skeleton";
// import fetchProducts from ''
const FoodItems = ({ category }) => {
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useSelector(
    (state) => state.productsList
  );

  console.log(data);
  const [addToCartClicked, setAddToCartClicked] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddToCardClicked = () => {
    setAddToCartClicked((pre) => !pre);
  };
  return (
    <div>
      <h2 className="font-bold text-lg lg:text-xl mt-6">Top Dishes </h2>
      <div className="mt-16  grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))]    gap-y-6 gap-x-3 place-content-center w-full place-items-center ">
        {isLoading ? (
          <LoadingProducts />
        ) : (
          data?.map((food) => {
            if (category === "All" || category === food.category)
              return (
                <FoodItem
                  food={food}
                  addToCartClicked={addToCartClicked}
                  handleAddToCardClicked={handleAddToCardClicked}
                />
              );
          })
        )}
      </div>
    </div>
  );
};

export default FoodItems;
