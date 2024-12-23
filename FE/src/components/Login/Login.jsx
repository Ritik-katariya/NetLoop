import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
// Custom Icons

const LoginPage = () => {
  const [activeForm, setActiveForm] = useState("login");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex justify-center">
          <h2 className="text-5xl font-bold">
            {activeForm === "login"
              ? "Login"
              : activeForm === "signup"
              ? "Sign Up"
              : "Forgot Password"}
          </h2>
        </CardHeader>
        <CardBody>
          {activeForm === "login" && <SignIn setActiveForm={setActiveForm} />}
          {activeForm === "signup" && <SignUp setActiveForm={setActiveForm} />}
          {activeForm === "forgot" && (
            <ForgotPassword setActiveForm={setActiveForm} />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;
