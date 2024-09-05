import React, { useEffect, useState } from "react";

import OrdersListTable from "./OrdersListTable";
import { toast } from "sonner";
import axios from "@/config/axios";
import { useSelector } from "react-redux";
import CustomPagination from "@/components/CustomPagination";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageItems, setCurrentPageItems] = useState([]);
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/order/get_all_orders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        setOrders(response?.data?.data);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  useEffect(() => {
    if (orders.length > 0) {
      const currentItems = orders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

      setCurrentPageItems(currentItems);
    }
  }, [currentPage, orders]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const deleteItem = async (ID) => {
    try {
      const response = await axios.delete(`/food/delete_food_item/${ID}`);
      toast.success("Item deleted successfully");
      setCurrentPageItems((currentItems) =>
        currentItems.filter((item) => item._id !== ID)
      );
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col p-4">
      <OrdersListTable orders={currentPageItems} loading={loading} />
      <div className="self-end mt-3">
        {totalPages > 1 && (
          <CustomPagination
            orders={orders}
            currentPage={currentPage}
            totalPages={totalPages}
            currentItems={currentPageItems}
            goToPage={goToPage}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
