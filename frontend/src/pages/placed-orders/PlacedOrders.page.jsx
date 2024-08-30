import Navbar from "@/components/Navbar";
import React from "react";
import CartTable from "../cart/Table";

const PlacedOrders = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  flex-grow grid place-content-center">
        <CartTable />
      </div>
    </div>
  );
};

export default PlacedOrders;
