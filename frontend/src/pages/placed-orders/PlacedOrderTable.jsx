import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Loader2, Minus, Plus, Trash2 } from "lucide-react";
import {
  addToCartWithAPI,
  deleteCartItemWithAPI,
  removeCartItemWithAPI,
} from "@/slices/cartSlice";
import { toast } from "sonner";
import axios from "@/config/axios";
import { assets } from "@/assets/assets";
import ListSkelton from "@/components/ListSkelton";
import { Button } from "@/components/ui/button";

const PlaceOrderTable = ({ data, loading, setTrackOrder, trackOrder }) => {
  return (
    <>
      <Table className="w-[90vw] md:w-[80vw] ">
        {data.length > 0 ? (
          <TableCaption>A list of your recent orders.</TableCaption>
        ) : (
          <TableCaption>No orders placed yet.</TableCaption>
        )}

        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[100px]"></TableHead>
            <TableHead className="min-w-[280px] text-center">Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>QTY</TableHead>
            <TableHead className="min-w-[100px]">Status</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 10 }).map((_, index) => {
              return (
                <TableRow key={index}>
                  {Array.from({ length: 6 }).map((_, index) => {
                    return (
                      <TableCell className="font-medium" key={index}>
                        <ListSkelton />
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <>
              {data?.map((order) => {
                return (
                  <TableRow key={order?._id}>
                    <TableCell className="font-medium">
                      <img
                        src={assets.parcel_icon}
                        alt={order?.name}
                        className=""
                      />
                    </TableCell>
                    <TableCell>
                      <div className="grid grid-cols-1 gap-1 ">
                        {order?.items.map((item, index) => {
                          return (
                            <div
                              className="grid grid-cols-3 place-items-start"
                              key={index}
                            >
                              {item.name}
                              <span className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                                QTY: {item.quantity}
                              </span>
                              <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                                ${item.price}
                              </span>
                              {/* <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 ml-3">
                            QTY: {item.quantity}
                          </span>
                          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 ml-1">
                            ${item.price}
                          </span> */}
                            </div>
                          );
                        })}
                      </div>
                    </TableCell>
                    <TableCell>${order?.amount}</TableCell>
                    <TableCell>{order?.items.length}</TableCell>

                    <TableCell className="">
                      {order.status === "Processing" && (
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          {order.status}
                        </span>
                      )}

                      {(order.status === "Shipped" ||
                        order.status === "Delivered") && (
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2  py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20  ">
                          {order.status}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        disabled={loading}
                        onClick={() => setTrackOrder((pre) => pre + 1)}
                      >
                        {loading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {loading ? "Please wait..." : "Track Order"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default PlaceOrderTable;
