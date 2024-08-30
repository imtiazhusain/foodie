import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";

const ItemsListSkelton = () => {
  return (
    <div className="">
      <Skeleton className="h-4 bg-gray-500" />
    </div>
  );
};

export default ItemsListSkelton;
