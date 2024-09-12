import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "../../config/axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const VerifyUser = () => {
  const [otpValue, setStopValue] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const [resendCodeLoading, setResendCodeLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { tempUser } = location.state;
      setUser(tempUser);
    }
  }, []);

  const handleChange = (event) => {
    setStopValue(event.target.value);
  };

  const verifyUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (otpValue === undefined) {
        toast.error("Please provide OTP");
        setLoading(false);

        return;
      }
      const data = {
        userId: user._id,
        OTP: otpValue,
      };

      const response = await axios.post("/user/verify_user", data);

      console.log(response);

      navigate("/login", {
        state: {
          signupSuccess: true,
        },
      });
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setResendCodeLoading(true);
    try {
      const data = {
        userId: user?._id,
        userEmail: user?.email,
      };

      const response = await axios.post("/user/send_otp", data);

      console.log(response);

      toast.success("Code resent successfully");
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setResendCodeLoading(false);
    }
  };

  return (
    <div className=" flex-grow grid place-content-center justify-around">
      <div className="bg-white w-72 md:w-[512px]  p-4 rounded-md mt-3 ">
        <h1 className="text-center font-medium text-lg mb-3">
          User Verification
        </h1>
        <h2 className="mb-3">
          We have send an OTP at{" "}
          {user?.email?.substring(0, 3) +
            "*****" +
            user?.email?.substring(user?.email.indexOf("@"))}
        </h2>
        <form action="" onSubmit={verifyUser}>
          <label htmlFor="" className="text-xs sm:text-sm md:text-xl ">
            Enter Verification Code
          </label>
          <input
            type="text"
            placeholder="John Doe"
            name="otp"
            value={otpValue || ""}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full p-2.5 outline-none placeholder:italic"
          />

          <Button disabled={loading} className="w-full mt-3">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Please wait..." : "Verify"}
          </Button>
        </form>

        <Button
          disabled={resendCodeLoading}
          className="w-full mt-3"
          onClick={resendCode}
        >
          {resendCodeLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {resendCodeLoading ? "Please wait..." : "Resend Code"}
        </Button>
      </div>
    </div>
  );
};

export default VerifyUser;
