import Navbar from "@/components/Navbar";
import { getCartDataFromApi } from "@/slices/cartSlice";
import { fetchProducts } from "@/slices/foodListSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  useEffect(() => {
    dispatch(getCartDataFromApi());
  }, []);
  return (
    <div className="h-svh md:h-screen flex flex-col  ">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
