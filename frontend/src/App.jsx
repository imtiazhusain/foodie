import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "@/pages/Layout";
import AdminLayout from "./pages/admin/Layout";
import { useSelector } from "react-redux";

// Lazy load the route components
const Login = lazy(() => import("./pages/login/Login"));
const Signup = lazy(() => import("./pages/signup/Signup"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard.page"));
const PageNotFound = lazy(() =>
  import("./pages/page-not-found/PageNotFound.page")
);
const Cart = lazy(() => import("./pages/cart/Cart.page"));
const PlaceOrder = lazy(() => import("./pages/place-order/PlaceOrder.page"));
const ListItems = lazy(() => import("./pages/admin/items-list/ListItems.page"));
const Orders = lazy(() => import("./pages/admin/orders/Orders.page"));
const AddItem = lazy(() => import("./pages/admin/add-item/AddItem.page"));
const PlacedOrders = lazy(() =>
  import("./pages/placed-orders/PlacedOrders.page")
);
const VerifyOrder = lazy(() => import("./pages/verify-order/VerifyOrder.page"));

function App() {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "Admin";
  return (
    <div className="font-outFit">
      <Suspense fallback={<div className="">loading...</div>}>
        <Routes>
          <Route path="/">
            {!isAdmin && (
              <Route element={<Layout />}>
                <Route index element={!user ? <Login /> : <Dashboard />} />
                <Route
                  path="login"
                  element={!user ? <Login /> : <Navigate to="/dashboard" />}
                />
                <Route
                  path="signup"
                  element={!user ? <Signup /> : <Navigate to="/dashboard" />}
                />
                <Route path="cart" element={<Cart />} />
                <Route path="place-order" element={<PlaceOrder />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route
                  path="verify-order"
                  element={user ? <VerifyOrder /> : <Navigate to="/login" />}
                />
                <Route
                  path="placed-orders"
                  element={user ? <PlacedOrders /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            )}
            {isAdmin && (
              <Route element={<AdminLayout />}>
                <Route index element={!user ? <Login /> : <ListItems />} />

                <Route
                  path="items-list"
                  element={
                    user?.role === "Admin" ? (
                      <ListItems />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="orders"
                  element={
                    user?.role === "Admin" ? (
                      <Orders />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="add-item"
                  element={
                    user?.role === "Admin" ? (
                      <AddItem />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            )}
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
