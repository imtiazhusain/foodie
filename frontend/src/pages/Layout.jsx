import Navbar from "@/components/Navbar";
import { getCartDataFromApi } from "@/slices/cartSlice";
import { fetchProducts } from "@/slices/foodListSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  useEffect(() => {
    if (user) dispatch(getCartDataFromApi());
  }, [user]);
  return (
    <div className="h-svh md:h-screen flex flex-col  ">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
