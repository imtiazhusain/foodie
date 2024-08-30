import Login from "./pages/login/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard/Dashboard.page";
import PageNotFound from "./pages/page-not-found/PageNotFound.page";
import Cart from "./pages/cart/Cart.page";
import PlaceOrder from "./pages/place-order/PlaceOrder.page";
import ListItems from "./pages/admin/items-list/ListItems.page";
import Layout from "./pages/admin/Layout";
import Orders from "./pages/admin/Orders.page";
import AddItem from "./pages/admin/add-item/AddItem.page";
import OrdersStatus from "./pages/placed-orders/PlacedOrders.page";
import PlacedOrders from "./pages/placed-orders/PlacedOrders.page";

function App() {
  return (
    <div className="font-outFit">
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cart" element={<Cart />} />
          <Route path="place-order" element={<PlaceOrder />} />
          <Route path="placed-orders" element={<PlacedOrders />} />
          <Route element={<Layout />}>
            <Route path="items-list" element={<ListItems />} />
            <Route path="orders" element={<Orders />} />
            <Route path="add-item" element={<AddItem />} />
          </Route>

          {/* <Route path="profile" element={userData ? <Profile /> : <Login />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
