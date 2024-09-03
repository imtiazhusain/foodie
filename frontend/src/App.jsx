import Login from "./pages/login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard/Dashboard.page";
import PageNotFound from "./pages/page-not-found/PageNotFound.page";
import Cart from "./pages/cart/Cart.page";
import PlaceOrder from "./pages/place-order/PlaceOrder.page";
import ListItems from "./pages/admin/items-list/ListItems.page";
import AdminLayout from "./pages/admin/Layout";
import Layout from "@/pages/Layout";
import Orders from "./pages/admin/orders/Orders.page";
import AddItem from "./pages/admin/add-item/AddItem.page";
import OrdersStatus from "./pages/placed-orders/PlacedOrders.page";
import PlacedOrders from "./pages/placed-orders/PlacedOrders.page";
import VerifyOrder from "./pages/verify-order/VerifyOrder.page";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "Admin";
  console.log(isAdmin);
  return (
    <div className="font-outFit">
      <Routes>
        <Route path="/">
          {/* <Route
            index
            element={
              !user ? <Login /> : isAdmin ? <ListItems /> : <Dashboard />
            }
          /> */}

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
                  user?.role === "Admin" ? <Orders /> : <Navigate to="/login" />
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

          {/* <Route path="profile" element={userData ? <Profile /> : <Login />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
