import { menu_list } from "@/assets/assets";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

const Menu = ({ category, setCategory }) => {
  return (
    <div>
      <div className="mt-16  md:w-[70%] mx-auto">
        <h2 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl tracking-wide text-center">
          Explore our Menu
        </h2>
        <p className="mt-5 text-gray-700 text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-center">
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
                <div
                  className={`  flex flex-col justify-start items-center gap-2`}
                  onClick={() =>
                    setCategory((pre) =>
                      pre === item.menu_name ? "All" : item.menu_name
                    )
                  }
                >
                  <img
                    src={item.menu_image}
                    alt={item.menu_name}
                    className={`max-w-24 max-h-24 cursor-pointer ${
                      category === item.menu_name
                        ? "border-4 border-slate-900 rounded-full p-[1px]"
                        : ""
                    }
                  `}
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
    </div>
  );
};

export default Menu;
