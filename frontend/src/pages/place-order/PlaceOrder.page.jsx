import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import axios from "@/config/axios";
import getTotalCartAmount from "@/lib/getTotalCartAmount";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const PlaceOrder = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { data } = useSelector((state) => state.productsList);
  const { user } = useSelector((state) => state.auth);
  const total = getTotalCartAmount(data, cartItems);

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setInputs((pre) => ({ ...pre, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];

    data?.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };

        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: inputs,
      items: orderItems,
      amount: getTotalCartAmount(data, cartItems) + 2,
    };

    try {
      setLoading(true);
      let response = await axios.post("/order/place_order", orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.access_token}`,
        },
      });

      const session_url = response?.data?.session_url;
      window.location.replace(session_url);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
            name="firstName"
            required
            value={inputs.firstName || ""}
            onChange={handleOnchange}
          />

          <input
            type="text"
            className="h-10 rounded-md  bg-gray-200 border-none "
            placeholder="Last Name"
            name="lastName"
            required
            value={inputs.lastName || ""}
            onChange={handleOnchange}
          />

          <input
            type="email"
            className="h-10 rounded-md  bg-gray-200 border-none  col-span-2"
            placeholder="Email Address"
            name="email"
            required
            value={inputs.email || ""}
            onChange={handleOnchange}
          />

          <input
            type="text"
            className="h-10 rounded-md  col-span-2 bg-gray-200 border-none "
            placeholder="Street"
            name="street"
            required
            value={inputs.street || ""}
            onChange={handleOnchange}
          />

          <input
            type="text"
            className="h-10 rounded-md  bg-gray-200 border-none "
            placeholder="City"
            name="city"
            required
            value={inputs.city || ""}
            onChange={handleOnchange}
          />

          <input
            type="text"
            className="h-10 rounded-md   bg-gray-200 border-none "
            placeholder="State"
            name="state"
            required
            value={inputs.state || ""}
            onChange={handleOnchange}
          />

          <input
            type="text"
            className="h-10 rounded-md  bg-gray-200 border-none "
            placeholder="Zip Code"
            name="zipcode"
            required
            value={inputs.zipcode || ""}
            onChange={handleOnchange}
          />

          <input
            type="text"
            className="h-10 rounded-md   bg-gray-200 border-none "
            placeholder="Country"
            name="country"
            required
            value={inputs.country || ""}
            onChange={handleOnchange}
          />

          <input
            type="text"
            className="h-10 rounded-md col-span-2 bg-gray-200 border-none "
            placeholder="Phone"
            name="phone"
            required
            value={inputs.phone || ""}
            onChange={handleOnchange}
          />

          {/* <Button className="col-span-2" onClick={placeOrder}>
            Submit
          </Button> */}
          <Button
            disabled={loading}
            className="col-span-2"
            onClick={placeOrder}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Please wait..." : "PROCEED TO PAYMENT"}
          </Button>
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
          {/* <Button className="">PROCEED TO PAYMENT</Button> */}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
