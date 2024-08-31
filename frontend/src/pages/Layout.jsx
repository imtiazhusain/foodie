import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-svh md:h-screen flex flex-col  ">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
