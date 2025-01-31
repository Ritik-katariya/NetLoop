import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button, Divider } from "@nextui-org/react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useUserLoginMutation } from "../../redux/api/authApi";
import { saveTokenToCookie } from "../../utils/cookeeSet";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/feature/emailSlice";

export default function SignIn({ setActiveForm }) {
  const emailValue = useSelector(selectEmail);
  const navigate = useNavigate();
  const [loginMutation] = useUserLoginMutation();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  if (emailValue) setEmail(emailValue);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginMutation({ email, password });
      if (res?.error) {
        toast.error(res.error.data);
        console.log("error", res.error);
      } else if (res?.data) {
        saveTokenToCookie(res.data.accessToken);
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const EyeIcon = ({ isVisible, onClick }) => (
    <button type="button" onClick={onClick} className="focus:outline-none">
      {isVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
    </button>
  );

  return (
    <div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col space-y-4 text-lg gap-2"
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          startContent={<MdOutlineAlternateEmail />}
          required
        />

        <Input
          type={isVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          startContent={<TbPasswordFingerprint />}
          endContent={
            <EyeIcon isVisible={isVisible} onClick={toggleVisibility} />
          }
          required
        />

        <Button type="submit" color="primary" className="w-full">
          Login
        </Button>
        <ToastContainer />
        <div className="text-center">
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={() => setActiveForm("forgot")}
          >
            Forgot Password?
          </button>
        </div>
        <Divider />
        <div className="text-center">
          <span>Don't have an account? </span>
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={() => setActiveForm("signup")}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
