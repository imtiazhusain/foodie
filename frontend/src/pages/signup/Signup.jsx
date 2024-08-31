import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import validateInputs from "@/lib/validateInputs";
const Signup = () => {
  const [inputs, setInputs] = useState({ profile_pic: {} });
  const [loading, setLoading] = useState(false);

  const [isErrors, setIsErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    if (name == "profile_pic") {
      setInputs((values) => ({ ...values, [name]: event.target.files[0] }));
    } else {
      const value = event.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    // for input validation
    const shouldReturn = validateInputs(inputs, setIsErrors);

    if (shouldReturn) {
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("email", inputs.email);
    formData.append("password", inputs.password);
    formData.append("profile_pic", inputs.profile_pic);

    try {
      const response = await axios.post("/user/register_user", formData);
      // Handle the response data here

      navigate("/login", {
        state: {
          signupSuccess: true,
        },
      });
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="h-svh md:h-screen  flex flex-col ">
    <div className=" flex-grow grid place-content-center ">
      <div className=" bg-white w-80 border border-gray-300 md:w-[512px]  p-4 rounded-md ">
        <div className="mb-4">
          <h1 className="font-bold text-base sm:text-2xl md:text-xl tracking-wide text-center">
            New Here ? Sign up now!
          </h1>
        </div>
        <form action="" className="" onSubmit={handleSubmit}>
          <div className="grid  md:grid-cols-2 md:gap-4 lg:gap-6 md:gap-y-6   grid-cols-1 gap-2">
            <div className="  space-y-2">
              <label htmlFor="" className="text-xs sm:text-sm md:text-xl ">
                Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                name="name"
                value={inputs.name || ""}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full   p-2.5  outline-none placeholder:italic"
              />

              {isErrors.name && (
                <span className="text-red-600 text-sm">{isErrors.name}</span>
              )}
            </div>
            <div className="space-y-2 ">
              <label htmlFor="" className="text-xs sm:text-sm md:text-xl">
                Email
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                name="email"
                value={inputs.email || ""}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full p-2.5 outline-none placeholder:italic"
              />
              {isErrors.email && (
                <span className="text-red-600 text-sm">{isErrors.email}</span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="" className="text-xs sm:text-sm md:text-xl">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                name="password"
                value={inputs.password || ""}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full p-2.5 outline-none placeholder:italic"
              />
              {isErrors.password && (
                <span className="text-red-600 text-sm">
                  {isErrors.password}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="" className="text-xs sm:text-sm md:text-xl">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                name="confirm_password"
                value={inputs.confirm_password || ""}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full p-2.5 outline-none placeholder:italic"
              />
              {isErrors.confirm_password && (
                <span className="text-red-600 text-sm">
                  {isErrors.confirm_password}
                </span>
              )}
            </div>

            <div className="space-y-2 ">
              <label htmlFor="" className="text-xs sm:text-sm md:text-xl">
                Upload Profile Pic
              </label>
              <input
                type="file"
                name="profile_pic"
                onChange={handleChange}
                className="  text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-slate-50 file:text-slate-700
      hover:file:bg-slate-100 file:cursor-pointer  "
                accept="image/*"
              />
              {isErrors.profile_pic && (
                <span className="text-red-600 text-sm block">
                  {isErrors.profile_pic}
                </span>
              )}
            </div>
          </div>

          <div>
            {/* <button
                className="w-full bg-slate-900  py-2.5 text-white tracking-wider hover:bg-slate-950 transition-colors duration-300 font-semibold rounded-lg mt-3 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Loading..." : "Create Account"}
              </button> */}
            <Button disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Please wait..." : "Create Account"}
            </Button>
          </div>

          <div>
            <h3 className="text-gray-500 mt-2  md:text-end text-sm md:text-lg">
              Already having an account ?
              <Link to="/login" className="text-slate-900 font-semibold ">
                {" "}
                Login
              </Link>
            </h3>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default Signup;
