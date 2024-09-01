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
      <div className="fixed top-0  z-[300] ">
        <Navbar />
      </div>
      <div className="mt-[100px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
