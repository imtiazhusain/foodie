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
import { useDispatch, useSelector } from "react-redux";
import { Delete, Minus, Plus, SquarePen, Trash2 } from "lucide-react";

import { toast } from "sonner";
import axios from "@/config/axios";
import { assets } from "@/assets/assets";

import ListSkelton from "@/components/ListSkelton";

const OrdersTable = ({ orders, loading }) => {
  const { user } = useSelector((state) => state.auth);

  const changeOrderStatus = async (event, orderId) => {
    try {
      const response = await axios.post(
        "/order/change_status",
        { orderId, status: event.target.value },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      toast.success("Order status Updated");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <Table className="">
        {orders.length && !loading > 0 ? (
          <TableCaption>A list of orders placed.</TableCaption>
        ) : !loading ? (
          <TableCaption>No orders added yet.</TableCaption>
        ) : (
          <></>
        )}

        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[100px]"></TableHead>
            <TableHead className="min-w-[300px]">Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>QTY</TableHead>
            <TableHead className="min-w-[200px]">Status</TableHead>
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
            : orders?.map((order) => {
                return (
                  <TableRow key={order._id}>
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
                              <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                                QTY: {item.quantity}
                              </span>
                              <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
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
                      <select
                        name="orderStatus"
                        id=""
                        onChange={(event) =>
                          changeOrderStatus(event, order?._id)
                        }
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </>
  );
};

export default OrdersTable;
