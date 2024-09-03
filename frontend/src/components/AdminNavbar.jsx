import React, { useState } from "react";
import { assets } from "../assets/assets";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/slices/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const navigation = [
  { name: "Dashboard", href: "/items-list", current: true },
  { name: "Login", href: "/login", current: false },
  { name: "Signup", href: "/signup", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const AdminNavbar = () => {
  const TotalCartItems = useSelector((state) => state.cart.totalItems);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Disclosure as="nav" className="bg-gray-800 w-screen">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <Link to="/items-list" className=" ">
            <div className="flex flex-shrink-0 items-center">
              <img alt="Logo" src={assets.logo} className="h-8 w-auto" />
            </div>
          </Link>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
            {/* Profile dropdown */}
            {user && (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    {/* <img
                      alt={user?.name}
                      // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      src={user?.profile_pic}
                      className="h-8 w-8 rounded-full object-cover"
                    /> */}

                    <Avatar className="w-8 h-8 rounded-full overflow-hidden">
                      <AvatarImage
                        src={user?.profile_pic}
                        className="w-full h-full object-cover"
                      />
                      <AvatarFallback>
                        {user?.name
                          ? user.name.substring(0, 2).toUpperCase()
                          : null}
                      </AvatarFallback>
                    </Avatar>
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <button
                      // onClick={dispatch(logoutUser())}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default AdminNavbar;
