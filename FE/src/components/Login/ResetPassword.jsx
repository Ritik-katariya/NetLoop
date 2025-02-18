import React, { useState } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetNewPasswordMutation } from "../../redux/api/authApi";
import { toast, ToastContainer } from "react-toastify";

export default function ResetPasswordForm() {
  const [setNewPasswordMutation, { isLoading,isSuccess }] = useSetNewPasswordMutation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    otp: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await setNewPasswordMutation(formData).unwrap();

      if (res.message) {
        toast.success("Password reset successfully!");
        setTimeout(() => navigate("/login", { replace: true }), 1500);
      } else {
        toast.error(res.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reset password!");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="w-full max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <ToastContainer />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            Email
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              startContent={<MdOutlineAlternateEmail className="text-gray-400" />}
              required
              className="w-full"
            />
          </label>
          <label>
            OTP
            <Input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              startContent={<RiVerifiedBadgeLine className="text-gray-400" />}
              required
              className="w-full"
            />
          </label>
          <label>
            New Password
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              startContent={<FiLock className="text-gray-400" />}
              required
              className="w-full"
            />
          </label>
          <label>
            Confirm Password
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              startContent={<FiLock className="text-gray-400" />}
              required
              className="w-full"
            />
          </label>
          <Button type="submit" color="primary" className="w-full mt-2" size="lg" disabled={isLoading}>
            {isLoading ? "Processing..." : "Reset Password"}
          </Button>
          <div className="text-center mt-4">
            <Link color="foreground" href="/login" className="text-sm">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
