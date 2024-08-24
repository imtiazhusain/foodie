import Login from "./pages/login/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard/Dashboard.page";
import PageNotFound from "./pages/page-not-found/PageNotFound.page";

function App() {
  return (
    <div className="font-outFit">
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* <Route path="profile" element={userData ? <Profile /> : <Login />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
