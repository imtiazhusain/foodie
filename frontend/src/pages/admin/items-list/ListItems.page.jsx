import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar";
import { assets } from "@/assets/assets";
import ItemsListTable from "./ItemsListTable";
import { toast } from "sonner";
import axios from "@/config/axios";
import ListSkelton from "@/components/ListSkelton";
// import ItemsListSkelton from "@/components/ListSkelton";
import CustomPagination from "@/components/CustomPagination";
import { useSelector } from "react-redux";

const ListItems = () => {
  const { user } = useSelector((state) => state.auth);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageItems, setCurrentPageItems] = useState([]);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/food/get_all_food_item", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        setItems(response?.data?.data);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      const currentItems = items.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      console.log(currentItems);

      setCurrentPageItems(currentItems);
    }
  }, [currentPage, items]);

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

  console.log(currentPageItems);

  return (
    <div className="flex flex-col p-4">
      <ItemsListTable
        items={currentPageItems}
        loading={loading}
        deleteItem={deleteItem}
      />
      <div className="self-end mt-3">
        <CustomPagination
          items={items}
          currentPage={currentPage}
          totalPages={totalPages}
          currentItems={currentPageItems}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
};

export default ListItems;
