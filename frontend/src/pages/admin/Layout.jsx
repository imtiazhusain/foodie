import React, { useState } from "react";
import { Sidebar } from "./Sidebar";

import { Outlet } from "react-router-dom";
import AdminNavbar from "@/components/AdminNavbar";
import ProfileModel from "@/components/ProfileModel";
const Layout = () => {
  const [openProfileModel, setOpenProfileModel] = useState(false);

  return (
    <div>
      <AdminNavbar setOpenProfileModel={setOpenProfileModel} />
      <div className="grid grid-cols-12">
        <div className="col-span-2 md:col-span-4 ">
          <Sidebar />
        </div>
        <div className="col-span-10 md:col-span-8 mt-6 ml-5 px-3 md:px-5">
          <Outlet />
        </div>
      </div>
      {openProfileModel && (
        <ProfileModel setOpenProfileModel={setOpenProfileModel} />
      )}
    </div>
  );
};

export default Layout;
