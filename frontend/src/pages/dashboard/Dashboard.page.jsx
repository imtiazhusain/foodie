import { assets, menu_list, food_list } from "@/assets/assets";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useState } from "react";

const Dashboard = () => {
  const [addToCartClicked, setAddToCartClicked] = useState(false);
  const handleAddToCardClicked = () => {
    setAddToCartClicked((pre) => !pre);
  };
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        {/* {header section} */}
        <div className="h-[35vh] md:h-[34vw]  mt-7 bg-image relative rounded-md">
          <div className="absolute left-[6vw] bottom-[10%]  sm:bottom-[10%] flex flex-col items-start max-w-[50%] gap-5 md:gap-5">
            {/* <div className=" h-[40vw] md:h-[34vw]  mt-7 bg-image  rounded-md">
          <div className="  flex flex-col justify-center h-full items-start max-w-[60%] md:max-w-[50%] md:gap-3 md:px-5 gap-2 px-3"> */}
            <h2 className="font-semibold text-sm xs:text-base sm:text-xl lg:text-3xl xl:4xl text-white">
              Order Your <br /> Favourite Food Here
            </h2>
            {/* <p className="text-sm md:text-base lg:text-xl text-white">
              Choose form a diverse menu featuring a delectable array of dishes
              crafted with the finest ingredients and culinary expertise. Our
              mission is to satisfying your cravings and evaluate you dinning
              experience, one delicious meal at a time
            </p> */}
            <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-white text-wrap">
              Choose form a diverse menu featuring a delectable array of dishes
              crafted with the finest ingredients and culinary expertise.
            </p>
            <Button>View Menu</Button>
          </div>
        </div>

        {/* {TExt section} */}
        <div className="mt-16 w-full md:w-[70%] lg:w-[50%]">
          <h2 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl tracking-wide">
            Explore our Menu
          </h2>
          <p className="mt-5 text-gray-700 text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl">
            {" "}
            Choose form a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfying your cravings and evaluate you dinning
            experience, one delicious meal at a time
          </p>
        </div>

        {/* filter */}
        <div className="w-full mt-6 shadow-sm py-3 rounded-md">
          <Carousel className="">
            <CarouselContent className="">
              {menu_list.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full xs:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6  "
                >
                  <div className="  flex flex-col justify-start items-center gap-2 ">
                    <img
                      src={item.menu_image}
                      alt={item.menu_name}
                      className="max-w-24 max-h-24 cursor-pointer "
                    />
                    <h2>{item.menu_name}</h2>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-slate-800 text-white hover:bg-slate-950 hover:text-white" />
            <CarouselNext className="right-0 bg-slate-800 text-white hover:bg-slate-950 hover:text-white" />
          </Carousel>
        </div>

        {/* items */}
        <div>
          <h2 className="font-bold text-lg lg:text-xl mt-6">Top Dishes </h2>
          <div className="mt-16  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4  gap-y-6 gap-x-2 place-content-center w-full place-items-center">
            {food_list.map((food) => (
              <div
                className="rounded-md h-[330px] bg-white max-w-[250px] shadow-md"
                key={food._id}
              >
                <div className="relative">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full rounded-t-md"
                  />
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
                    <h2 className="text-orange-500 font-semibold">
                      ${food.price}
                    </h2>
                  </div>
                  <h2 className="text-gray-400 text-sm">{food.description}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* footer */}
      </div>{" "}
      <Footer />
    </div>
  );
};

export default Dashboard;
