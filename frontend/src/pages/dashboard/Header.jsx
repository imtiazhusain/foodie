import { Button } from "@/components/ui/button";
import React from "react";

const Header = () => {
  return (
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
  );
};

export default Header;
