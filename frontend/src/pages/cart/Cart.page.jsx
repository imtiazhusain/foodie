import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import CartTable from "./Table";
import getTotalCartAmount from "@/lib/getTotalCartAmount";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { data } = useSelector((state) => state.productsList);
  const total = getTotalCartAmount(data, cartItems);
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  flex-grow grid place-content-center">
      <CartTable />
      <div className="flex justify-between items-center flex-wrap gap-8 mt-3">
        <div className="min-w-[230px] w-full md:w-1/3 text-gray-500 space-y-3 bg-white p-4 rounded-md border border-gray-200">
          <h2 className="font-semibold mb-3 text-slate-900 text-lg">
            Cart Totals
          </h2>
          <div className="flex justify-between">
            <h3>SubTotals</h3>
            <h3>{total > 0 ? "$ " + total : "0"}</h3>
          </div>
          <hr />
          <div className="flex justify-between">
            <h3>Delivery Fee</h3>
            <h3>{total > 0 ? "$1" : "0"}</h3>
          </div>
          <hr />
          <div className="flex justify-between ">
            <h3 className="font-semibold text-slate-900">Total</h3>
            <h3 className="font-semibold text-slate-900">
              {total > 0 ? "$ " + Number(total + 1) : "0"}
            </h3>
          </div>
          <hr />

          <div className="flex flex-col items-center gap-3">
            <Button className="" disabled={(total === 0 || !user) && true}>
              <Link to="/place-order">PROCEED TO CHECKOUT</Link>
            </Button>
            {!user && (
              <Link to="/login" className="text-red-500">
                Login to proceed
              </Link>
            )}
          </div>
        </div>

        <div className="mb-5 bg-white rounded-md border border-gray-200 p-4">
          <h3 className="text-gray-500 mb-2">
            If you have coupon code Enter here
          </h3>
          <div>
            <input
              type="text"
              className="h-10 rounded-md mr-2 bg-gray-200 border-none w-full md:w-auto"
              placeholder="Promo code"
            />
            <Button className="mt-2 md:mt-auto w-full md:w-auto">Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
