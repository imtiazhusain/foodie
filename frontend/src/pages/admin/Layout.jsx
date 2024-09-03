import React from "react";
import { Sidebar } from "./Sidebar";

import { Outlet } from "react-router-dom";
import AdminNavbar from "@/components/AdminNavbar";
const Layout = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="grid grid-cols-12">
        <div className="col-span-4 ">
          <Sidebar />
        </div>
        <div className="col-span-8 mt-6 ml-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
