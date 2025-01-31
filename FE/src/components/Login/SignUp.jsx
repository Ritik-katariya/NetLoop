import React, { useState } from "react";
import { Input, Button, Divider, Link } from "@nextui-org/react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSendOtpMutation } from "../../redux/api/member";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, selectEmail } from "../../redux/feature/emailSlice";

export default function SignUp({ setActiveForm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendOtpMutation] = useSendOtpMutation();

  const email = useSelector(selectEmail);
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const EyeIcon = ({ isVisible, onClick }) => (
    <button type="button" onClick={onClick} className="focus:outline-none">
      {isVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
    </button>
  );

  const handleSignup = async (e) => {
    e.preventDefault();
    const user = { email, password };

    try {
      const result = await sendOtpMutation(user).unwrap();
      toast.success("OTP sent successfully!");
      setTimeout(() => {
        
      }, 1000);
      navigate("/verifyotp");
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
      console.error("Failed to send OTP:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup} className="flex flex-col space-y-4">
        <ToastContainer />
        <Input
          type="email"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
          placeholder="Enter your email"
          startContent={<MdOutlineAlternateEmail />}
          required
        />
        <Input
          type={isVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          startContent={<TbPasswordFingerprint />}
          endContent={<EyeIcon isVisible={isVisible} onClick={toggleVisibility} />}
          required
        />
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          startContent={<TbPasswordFingerprint />}
          required
        />
        {password && confirmPassword && password !== confirmPassword && (
          <p className="text-red-500 text-sm">Passwords do not match</p>
        )}
        <Button
          type="submit"
          disabled={!email || password !== confirmPassword}
          color="primary"
          className="w-full cursor-pointer"
        >
          Sign Up
        </Button>
        <Divider />
        <div className="text-center">
          <span>Already have an account? </span>
          <Link
            color="primary"
            href="/login"
            onClick={() => setActiveForm("login")}
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
