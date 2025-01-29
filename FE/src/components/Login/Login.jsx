import React, { useState, useMemo } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const LoginPage = () => {
  const [activeForm, setActiveForm] = useState("login");

  const renderForm = useMemo(() => {
    if (activeForm === "login") return <SignIn setActiveForm={setActiveForm} />;
    if (activeForm === "signup") return <SignUp setActiveForm={setActiveForm} />;
    if (activeForm === "forgot")
      return <ForgotPassword setActiveForm={setActiveForm} />;
  }, [activeForm]);

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
        <CardBody>{renderForm}</CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;
