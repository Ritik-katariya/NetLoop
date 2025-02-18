import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useForgetPasswordMutation } from "../../redux/api/authApi";
import { toast, ToastContainer } from "react-toastify";

export default function ForgotPassword({ setActiveForm }) {
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
       await forgetPassword({ email }).unwrap();
      

      
        toast.success("OTP sent successfully!");
        setTimeout(() => {
          navigate("/forgot-password", { replace: true, state: { email } });
        }, 1000);
      
       
    } catch (error) {
      toast.error(error?.data?.message || "Error sending OTP!");
    }
  };

  return (
    <div>
      <form onSubmit={handleForgotPassword} className="flex flex-col space-y-4">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          startContent={<MdOutlineAlternateEmail />}
          required
        />
        <ToastContainer />
        <Button type="submit" color="primary" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : "Reset Password"}
        </Button>
        <div className="text-center">
          <Link color="foreground" href="#" onClick={() => setActiveForm("login")}>
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
