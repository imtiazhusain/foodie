import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingProducts = () => {
  return (
    <div className="mt-16  grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))]    gap-y-6 gap-x-10 place-content-center w-full place-items-center">
      {Array.from({ length: 8 }).map((_, index) => {
        return (
          <div
            key={index}
            className="flex flex-col space-y-3 bg-gray-300 p-2 rounded-md h-[330px] "
          >
            <Skeleton className="h-[165px] w-[250px] rounded-md" />
            <div className="">
              <Skeleton className="h-4 w-[130px] mb-5" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LoadingProducts;
