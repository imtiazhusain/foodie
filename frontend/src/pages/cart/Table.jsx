import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Minus, Plus, Trash2 } from "lucide-react";
import {
  addToCart,
  deleteItemFromCart,
  removeFromCart,
} from "@/slices/cartSlice";

const CartTable = () => {
  const { items: cartItems, totalItems } = useSelector((state) => state.cart);
  const { data } = useSelector((state) => state.productsList);
  const dispatch = useDispatch();
  console.log(cartItems);

  return (
    <>
      <Table className="md:w-[60vw] lg:w-[80vw] ">
        {totalItems > 0 ? (
          <TableCaption>A list of your recent cart items.</TableCaption>
        ) : (
          <TableCaption>No items added to Cart.</TableCaption>
        )}

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Item</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <TableRow>
                  <TableCell className="font-medium">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="rounded-md shadow-md"
                    />
                  </TableCell>
                  <TableCell>{item?.name}</TableCell>
                  <TableCell>${item?.price}</TableCell>
                  <TableCell>
                    {cartItems[item._id] ? (
                      <div className=" h-7 w-[80px] rounded-full bg-white grid place-content-center font-medium p-3">
                        <div className="flex gap-2 justify-evenly">
                          <button
                            className=" h-6 w-6 rounded-full bg-red-50 text-red-700 grid place-content-center font-medium     items-center r  px-2 py-1 text-xs   ring-1 ring-inset ring-red-600/10"
                            onClick={() => dispatch(removeFromCart(item._id))}
                          >
                            <Minus size={15} />
                          </button>

                          <p>{cartItems[item._id]}</p>
                          <button
                            className=" h-6 w-6 rounded-full bg-green-100 text-green-300 grid place-content-center font-medium items-center r  px-2 py-1 text-xs   ring-1 ring-inset ring-green-600/20"
                            onClick={() => dispatch(addToCart(item._id))}
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className=" h-6 w-6 rounded-full bg-white grid place-content-center font-medium"
                        onClick={() => dispatch(addToCart(item._id))}
                      >
                        <Plus size={15} />
                      </button>
                    )}
                  </TableCell>
                  <TableCell>${cartItems[item._id] * item?.price}</TableCell>
                  <TableCell className="">
                    <Trash2
                      className="text-red-400 cursor-pointer"
                      onClick={() => dispatch(deleteItemFromCart(item?._id))}
                    />
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default CartTable;
