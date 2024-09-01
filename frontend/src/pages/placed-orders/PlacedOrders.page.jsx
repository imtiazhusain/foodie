import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import PlaceOrderTable from "./PlacedOrderTable";

import { useSelector } from "react-redux";

import { toast } from "sonner";
import axios from "@/config/axios";
import { assets } from "@/assets/assets";

const PlacedOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const getPlacedOrders = async () => {
      try {
        const response = await axios.get("/order/get_user_orders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        setOrdersData(response?.data?.data);
      } catch (error) {
        console.log(error);
        toast.error(error?.response.data?.message || "Something went wrong");
      }
    };
    if (user) getPlacedOrders();
  }, [user]);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  flex-grow grid place-content-center">
      {/* <div className="xs:w-[90vw] md:w-[80vw] w-[92vw]">
        {ordersData?.map((order, index) => {
          return (
            <div
              key={order._id}
              className="md:flex md:items-center md:justify-between border border-gray-400 w-full md:gap-4  md:p-4 p-2 grid grid-cols-4 md:grid-cols-3 place-items-center grid-rows-[1fr_50px] text-gray-600"
            >
              <div className="space-y-2 row-span-2 justify-start">
                <img src={assets.parcel_icon} alt="icon" className="" />
                <p className="ml-2 text-base md:text-xl">${order.amount}.00</p>
              </div>
              {order?.items.map((item, index) => {
                if (index === item.length - 1) {
                  return (
                    <p className="col-span-3 md:col-span-2 text-base md:text-xl">
                      {item.name} x {item.quantity}
                    </p>
                  );
                } else {
                  return (
                    <p className="col-span-3 md:col-span-2 text-base md:text-xl">
                      {item.name} x {item.quantity} ,
                    </p>
                  );
                }
              })}

              <p className="text-base md:text-xl ">
                Items: {order.items.length}
              </p>

              <span className="inline-flex items-center rounded-md bg-green-50 px-2 lg:px-4 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 md:text-xl col-span-2 md:col-span-1 ">
                {order.status}
              </span>
            </div>
          );
        })}
      </div> */}
      <PlaceOrderTable data={ordersData} />
    </div>
  );
};

export default PlacedOrders;
