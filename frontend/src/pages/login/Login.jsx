import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import Navbar from "../../components/Navbar";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { setUser } from "@/slices/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [isErrors, setIsErrors] = useState({ email: "", password: "" });

  const location = useLocation();
  const navigate = useNavigate();

  // if user come form signup form show msg to login
  useEffect(() => {
    if (location.state) {
      toast.success("Account Created Please Login");
    }
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  function validateInputs() {
    let newErrors = {};
    if (!inputs.email) {
      newErrors.email = "Email is required";
    }
    if (!inputs.password) {
      newErrors.password = "Password is required";
    }

    setIsErrors(newErrors);
    if (Object.values(newErrors).some((error) => error !== "")) {
      setLoading(false);
      return true;
    }
    return false;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    // for input validation
    const shouldReturn = validateInputs();

    if (shouldReturn) {
      return;
    }

    try {
      const response = await axios.post("/user/login", inputs);
      // Handle the response data here

      localStorage.setItem("userInfo", JSON.stringify(response?.data?.data));

      dispatch(setUser(response?.data?.data));
      console.log(response);
      if (response.data.data.role === "Admin") {
        navigate("/items-list");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : "Something went wrong"
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}

      <div className=" flex-grow grid place-content-center justify-around">
        <div className="bg-white w-80 border border-gray-300  p-4 rounded-md ">
          <h1 className=" text-center font-bold text-2xl tracking-wide ">
            Welcome Back!
          </h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mt-9">
              <div className="flex flex-col gap-1">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  placeholder="name@company.com"
                  value={inputs.email || ""}
                  onChange={handleChange}
                  name="email"
                  className="bg-gray-100 border border-gray-300 text-gray-900  rounded-lg  w-full p-2.5 outline-none"
                />
                {isErrors.email && (
                  <span className="text-red-600 text-sm">{isErrors.email}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={inputs.password || ""}
                  onChange={handleChange}
                  name="password"
                  className="bg-gray-100 border border-gray-300 text-gray-900 s rounded-lg  w-full p-2.5 outline-none"
                />
                {isErrors.password && (
                  <span className="text-red-600 text-sm">
                    {isErrors.password}
                  </span>
                )}
              </div>

              <Button disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Please wait..." : "Login"}
              </Button>
              <div>
                <h3 className="text-gray-500 text-end">
                  Don't have an account ?
                  <Link to="/signup" className="text-slate-900 font-semibold ">
                    {" "}
                    Signup
                  </Link>
                </h3>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
