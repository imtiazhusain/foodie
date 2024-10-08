import React from "react";
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
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/slices/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const navigation = [
  { name: "Home", href: "/dashboard", current: true },
  { name: "Orders", href: "/placed-orders", current: true },
  { name: "Login", href: "/login", current: false },
  { name: "Signup", href: "/signup", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Navbar = ({ setOpenProfileModel }) => {
  const TotalCartItems = useSelector((state) => state.cart.totalItems);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditProfile = () => {
    setOpenProfileModel(true);
  };
  const handleLogout = () => {
    navigate("/login");
    dispatch(logoutUser());
  };
  return (
    <Disclosure as="nav" className="bg-gray-800 w-screen">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button*/}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/dashboard" className=" hidden sm:block">
              <div className="flex flex-shrink-0 items-center">
                <img alt="Logo" src={assets.logo} className="h-8 w-auto" />
              </div>
            </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex justify-between space-x-4">
                {navigation.slice(0, 2).map((item, index) => {
                  if (index === 1 && !user) return null;

                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        isActive
                          ? " bg-gray-900 text-white px-3 py-2 font-medium rounded-md" // Add 'active' when the link is active
                          : " bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 font-medium rounded-md"
                      }
                    >
                      {item.name}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
            {!user && (
              <div className="hidden sm:block">
                {navigation.slice(2, 4).map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      isActive
                        ? " bg-gray-900 text-white px-3 py-2 font-medium rounded-md mr-4" // Add 'active' when the link is active
                        : " bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 font-medium rounded-md mr-4"
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            )}

            <Link to="/cart">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <div className="flex items-center justify-center">
                  <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                  <span className="inline mb-5 -ml-3 items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                    {TotalCartItems}
                  </span>
                </div>
              </button>
            </Link>

            {/* Profile dropdown */}
            {user && (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>

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
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 w-full"
                      onClick={handleEditProfile}
                    >
                      Your Profile
                    </button>
                  </MenuItem>

                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 w-full"
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

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item, index) => {
            if (index === 1 && !user) return null;
            if (index > 1 && user) return null;
            return (
              <DisclosureButton
                key={item.name}
                as={NavLink}
                to={item.href}
                className={({ isActive }) => {
                  return classNames(
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  );
                }}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
