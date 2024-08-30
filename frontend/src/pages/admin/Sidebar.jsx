import { FilePlus, List, PackagePlus } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="flex flex-col gap-5 h-svh md:h-screen justify-start items-stretch mt-6">
      <NavLink
        to="/add-item"
        className={({ isActive }) =>
          isActive
            ? "flex items-center justify-center gap-6 p-3 bg-slate-900 text-white font-semibold " // Add 'active' when the link is active
            : "flex items-center justify-center gap-6 p-3 border border-gray-500 bg-transparent text-slate-900 font-semibold"
        }
      >
        <FilePlus />
        <h2 className=" hidden xs:block">Add Item</h2>
      </NavLink>

      <NavLink
        to="/items-list"
        className={({ isActive }) =>
          isActive
            ? "flex items-center justify-center gap-6 p-3 bg-slate-900 text-white font-semibold" // Add 'active' when the link is active
            : "flex items-center justify-center gap-6 p-3 border border-gray-500 bg-transparent text-slate-900 font-semibold"
        }
      >
        <List />
        <h2 className=" hidden xs:block">All Items</h2>
      </NavLink>

      <NavLink
        to="/orders"
        className={({ isActive }) =>
          isActive
            ? "flex items-center justify-center gap-6 p-3 bg-slate-900 text-white font-semibold" // Add 'active' when the link is active
            : "flex items-center justify-center gap-6 p-3 border border-gray-500 bg-transparent text-slate-900 font-semibold"
        }
      >
        <PackagePlus />
        <h2 className=" hidden xs:block">All Orders</h2>
      </NavLink>
    </div>
  );
};
