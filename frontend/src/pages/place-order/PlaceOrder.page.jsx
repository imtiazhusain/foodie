import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import getTotalCartAmount from "@/lib/getTotalCartAmount";
import React from "react";
import { useSelector } from "react-redux";

const PlaceOrder = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { data } = useSelector((state) => state.productsList);
  const total = getTotalCartAmount(data, cartItems);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  flex-grow grid place-content-normal w-[90vw]  ">
      <div className="flex justify-between items-center flex-wrap   content-center gap-5">
        <div className=" grid grid-cols-2 grid-rows-4 grid-flow-row  gap-3 w-full md:w-auto">
          <h2 className="font-semibold col-span-2 mb-3 text-slate-900 text-lg">
            Delivery Information
          </h2>
          <input
            type="text"
            className="h-10 rounded-md  bg-gray-200 border-none "
            placeholder="First Name"
          />

          <input
            type="text"
            className="h-10 rounded-md  bg-gray-200 border-none "
            placeholder="Last Name"
          />

          <input
            type="email"
            className="h-10 rounded-md  bg-gray-200 border-none  col-span-2"
            placeholder="Email Address"
          />

          <input
            type="text"
            className="h-10 rounded-md  col-span-2 bg-gray-200 border-none "
            placeholder="Street"
          />

          <input
            type="text"
            className="h-10 rounded-md  bg-gray-200 border-none "
            placeholder="City"
          />

          <input
            type="text"
            className="h-10 rounded-md   bg-gray-200 border-none "
            placeholder="State"
          />

          <input
            type="text"
            className="h-10 rounded-md  bg-gray-200 border-none "
            placeholder="Zip Code"
          />

          <input
            type="text"
            className="h-10 rounded-md   bg-gray-200 border-none "
            placeholder="Country"
          />

          <input
            type="text"
            className="h-10 rounded-md col-span-2 bg-gray-200 border-none "
            placeholder="Phone"
          />

          <Button className="col-span-2">Submit</Button>
        </div>
        <div className=" text-gray-500 space-y-3 w-full md:w-auto">
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
          <Button className="">PROCEED TO PAYMENT</Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
