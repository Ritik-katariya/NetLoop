import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { MdOutlineAlternateEmail } from "react-icons/md";

export default function ForgotPassword({ setActiveForm }) {
  const [email, setEmail] = useState("");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Implement password reset logic here
    console.log("Password reset requested for:", email);
  };
  return (
    <div>
      <form onSubmit={handleForgotPassword} className="flex flex-col space-y-4">
        <Input
          type="email"
          // label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          startContent={<MdOutlineAlternateEmail />}
          required
        />
        <Button type="submit" color="primary" className="w-full">
          Reset Password
        </Button>
        <div className="text-center">
          <Link
            color="foreground"
            href="#"
            onClick={() => setActiveForm("login")}
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
