import { Button } from "@/components/ui/button";
import React from "react";

const Header = () => {
  return (
    <div className="h-[35vh] md:h-[34vw]  mt-7 bg-image relative rounded-md">
      <div className="absolute left-[6vw] bottom-[10%]  sm:bottom-[10%] flex flex-col items-start max-w-[50%] gap-5 md:gap-5">
        <h2 className="font-semibold text-sm xs:text-base sm:text-xl lg:text-3xl xl:4xl text-white">
          Order Your <br /> Favourite Food Here
        </h2>

        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-white text-wrap">
          Choose form a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise.
        </p>
        <Button>View Menu</Button>
      </div>
    </div>
  );
};

export default Header;
