import React, { useEffect, useState } from "react";
import PlaceOrderTable from "./PlacedOrderTable";

import { useSelector } from "react-redux";

import { toast } from "sonner";
import axios from "@/config/axios";

const PlacedOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trackOrder, setTrackOrder] = useState(1);

  useEffect(() => {
    const getPlacedOrders = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    if (user) getPlacedOrders();
  }, [user, trackOrder]);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  flex-grow grid place-content-center">
      <PlaceOrderTable
        data={ordersData}
        loading={loading}
        setTrackOrder={setTrackOrder}
      />
    </div>
  );
};

export default PlacedOrders;
