import Dialog from "@/components/Dialog";
import Navbar from "@/components/Navbar";
import ProfileModel from "@/components/ProfileModel";
import { getCartDataFromApi } from "@/slices/cartSlice";
import { fetchProducts } from "@/slices/foodListSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [openProfileModel, setOpenProfileModel] = useState(false);

  console.log(openProfileModel);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  useEffect(() => {
    if (user) dispatch(getCartDataFromApi());
  }, [user]);
  return (
    <div className="h-svh md:h-screen flex flex-col  justify-around">
      <div className="fixed top-0  z-[300] ">
        <Navbar setOpenProfileModel={setOpenProfileModel} />
      </div>
      <div className=" mt-[100px] md:mt-[100px]">
        <Outlet />
      </div>
      {openProfileModel && (
        <ProfileModel setOpenProfileModel={setOpenProfileModel} />
      )}
    </div>
  );
};

export default Layout;
