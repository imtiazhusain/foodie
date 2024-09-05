import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";

import ListSkelton from "@/components/ListSkelton";

const ItemsListTable = ({ items, loading, deleteItem }) => {
  return (
    <>
      <Table className="">
        {items.length && !loading > 0 ? (
          <TableCaption>A list of your recent items.</TableCaption>
        ) : !loading ? (
          <TableCaption>No items added yet.</TableCaption>
        ) : (
          <></>
        )}

        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 10 }).map((_, index) => {
                return (
                  <TableRow key={index}>
                    {Array.from({ length: 5 }).map((_, index) => {
                      return (
                        <TableCell className="font-medium" key={index}>
                          <ListSkelton />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            : items.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="rounded-md shadow-md"
                      />
                    </TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>${item?.price}</TableCell>
                    <TableCell>{item?.category}</TableCell>

                    <TableCell className="">
                      <div className="flex  gap-4">
                        <SquarePen
                          className="text-slate-900 cursor-pointer"
                          // onClick={() => deleteItem(item?._id)}
                        />
                        <Trash2
                          className="text-red-400 cursor-pointer"
                          onClick={() => deleteItem(item?._id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </>
  );
};

export default ItemsListTable;
