import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Divider, Link } from "@nextui-org/react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { useUserLoginMutation } from "../../redux/api/authApi";
import {saveTokenToCookie} from "../../utils/cookeeSet";
import { useNavigate } from "react-router-dom";
export default function SignIn({ setActiveForm }) {
  const navigate = useNavigate();
  const [loginMutation] = useUserLoginMutation();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async(e) => {
    e.preventDefault();
   try {
    const res=await loginMutation({email, password});
   if(res?.error){console.log("error", res.error)}
    else if(res?.data){
      const savetoken=saveTokenToCookie(res.data.accessToken);
      console.log(savetoken);
      navigate("/");
    }
   } catch (error) {
    console.log("error", error)
   }
    
    
  };

  const EyeIcon = ({ isVisible, onClick }) => (
    <button type="button" onClick={onClick} className="focus:outline-none">
      {isVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
    </button>
  );

  return (
    <div>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4 text-lg gap-2">
      
      
       <Input
          type="email"
          // label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          startContent={<MdOutlineAlternateEmail />}
          // endContent={<MdOutlineAlternateEmail />}
          required
         
        //  className="border-b-2 rounded-lg "
        ></Input>
       
      
        <Input
          type={isVisible ? "text" : "password"}
          // label="Password"
          isRequired
          errorMessage="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          labelPlacement="outside"
          startContent={<TbPasswordFingerprint />}
          endContent={
            <EyeIcon isVisible={isVisible} onClick={toggleVisibility} />
          }
          required
        />
        <Button type="submit" color="primary" className="w-full">
          Login
        </Button>
        <div className="text-center">
          <Link
            color="foreground"
            href="#"
            onClick={() => setActiveForm("forgot")}
          >
            Forgot Password?
          </Link>
        </div>
        <Divider />
        <div className="text-center">
          <span>Don't have an account? </span>
          <Link
            color="primary"
            href="#"
            onClick={() => setActiveForm("signup")}
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
