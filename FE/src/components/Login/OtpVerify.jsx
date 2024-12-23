import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { MdOutlineNumbers } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "../../redux/api/member";
export default function OtpVerify() {
    const [verifyOTPMutation] = useVerifyOtpMutation();
    const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setotp] = useState("")

  const verifyOTP = async(e) => {
    e.preventDefault();
    // Implement password reset logic here
    console.log("OTP verify requested for:", email);
    try {
      const { data, error } =await verifyOTPMutation({ email, otp });
    } catch (error) {
      console.error("OTP verify failed :"+error.message)
      
    }
    navigate("/create", { replace: true }); 
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
          <Card className="w-full max-w-md">
          <CardHeader className="flex justify-center">
          <h2 className="text-5xl font-bold">
            Verify OTP
          </h2>
        </CardHeader>
     <CardBody>
     <form onSubmit={verifyOTP} className="flex flex-col space-y-4 text-lg gap-2">
        <Input
          type="email"
          // label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          startContent={<MdOutlineAlternateEmail />}
          required
        />
        <Input
          type="text"
          // label="Email"
          value={otp}
          onChange={(e) => setotp(e.target.value)}
          placeholder="OTP send on your email"
          startContent={<MdOutlineNumbers />}
          required
        />
        <Button type="submit" color="primary" className="w-full">
          Verify OTP
        </Button>
        <div className="text-center">
          <Link
            color="foreground"
            href="/login"
            // onClick={() => setActiveForm("login")}
          >
            Back to Login
          </Link>
        </div>
      </form>
     </CardBody>
      </Card>
    </div>
  );
}
