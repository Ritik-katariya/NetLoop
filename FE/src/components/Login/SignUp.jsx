import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Divider, Link } from "@nextui-org/react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {useSendOtpMutation}  from "../../redux/api/member";


export default function SignUp({ setActiveForm }) {
  const [sendOtpMutation, { isLoading, }] = useSendOtpMutation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);

  const EyeIcon = ({ isVisible, onClick }) => (
    <button type="button" onClick={onClick} className="focus:outline-none">
      {isVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
    </button>
  );

  const handleSignup =async (e) => {
    e.preventDefault();
    const user={email,password}
    await sendOtpMutation(user);
    
    // Implement signup logic here
    console.log("Signup attempt with:", { email, password });
    navigate("/verifyotp");
  };
  return (
    <div>
      <form onSubmit={handleSignup} className="flex flex-col space-y-4">
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
          type={isVisible ? "text" : "password"}
          // label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          startContent={<TbPasswordFingerprint />}
          endContent={
            <EyeIcon isVisible={isVisible} onClick={toggleVisibility} />
          }
          required
        />
        <Input
          type="password"
          value={confirmPassword}
          // label="Confirm Password"
          placeholder="Confirm your password"
          onChange={(e) => setconfirmPassword(e.target.value)}
          startContent={<TbPasswordFingerprint />}
          required
        />
        {password !== confirmPassword && <p>Confirm password not match</p>}
        <Button
          type="submit"
          // size="lg"
          // variant="solid"
          disabled={password !== confirmPassword}
          color="primary"
          className="w-full"
        >
          Sign Up
        </Button>
        <Divider />
        <div className="text-center">
          <span>Already have an account? </span>
          <Link
            color="primary"
            href="login"
            onClick={() => setActiveForm("login")}
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
