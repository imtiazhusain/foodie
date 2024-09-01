import { Button } from "@/components/ui/button";
import axios from "@/config/axios";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const VerifyOrder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isOrderSucceed = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyOder = async () => {
      try {
        const response = await axios.post(
          "/order/verify-order",
          {
            orderId,
            success: isOrderSucceed,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        if (response?.data?.success == "success") {
          toast.success("Order Completed successfully");
          navigate("/placed-orders");
        } else {
          toast.success("Order failed please try again");

          navigate("/place-order");
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response.data?.message || "Something went wrong");
      }
    };
    verifyOder();
  }, []);

  return (
    <div className="flex-grow grid place-content-center ">
      <Button className="bg-slate-900">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        Please wait...
      </Button>
    </div>
  );
};

export default VerifyOrder;
