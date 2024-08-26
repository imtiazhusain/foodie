import Navbar from "@/components/Navbar";
import React from "react";
import CartTable from "./Table";
import getTotalCartAmount from "@/lib/getTotalCartAmount";
import { useSelector } from "react-redux";
import { food_list } from "@/assets/assets";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const total = getTotalCartAmount(food_list, cartItems);
  console.log(total);
  return (
    <div className=" h-svh md:h-screen flex flex-col  ">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  flex-grow grid place-content-center">
        <CartTable />
        <div className="flex justify-between items-center flex-wrap gap-8 mt-16">
          <div className="w-full md:w-1/3 text-gray-500 space-y-3">
            <h2 className="font-semibold mb-3 text-slate-900 text-lg">
              Cart Totals
            </h2>
            <div className="flex justify-between">
              <h3>SubTotals</h3>
              <h3>${total}</h3>
            </div>
            <hr />
            <div className="flex justify-between">
              <h3>Delivery Fee</h3>
              <h3>$1</h3>
            </div>
            <hr />
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold text-slate-900">Total</h3>
              <h3 className="font-semibold text-slate-900">${total + 1}</h3>
            </div>
            <Button className="mt-9">PROCEED TO CHECKOUT</Button>
          </div>

          <div className="mb-5">
            <h3 className="text-gray-500">
              If you have coupon code Enter here
            </h3>
            <div>
              <input
                type="text"
                className="h-10 rounded-md mr-2 bg-gray-200 border-none "
                placeholder="Promo code"
              />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
