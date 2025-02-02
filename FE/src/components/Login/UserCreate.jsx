import React, { useState } from "react";
import { Input, Button, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { MdOutlineAlternateEmail, MdOutlineSmartphone, MdDriveFileRenameOutline } from "react-icons/md";
import { useCreateMemberMutation } from "../../redux/api/member";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/feature/emailSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { saveTokenToCookie } from "../../utils/cookeeSet";
export default function UserCreate() {
  const navigate = useNavigate();
  const email = useSelector(selectEmail);
  const [createMemberMutation] = useCreateMemberMutation();
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");

  const handlePhoneChange = (e) => {
    const value = e.target.value.slice(0, 10); // Limit input to 10 digits
    setphone(value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!name || !phone || !email) {
        toast.error("Please fill in all fields");
        return;
      }

      if (phone.length !== 10) {
        toast.error("Phone number must be exactly 10 digits");
        return;
      }

      if (!/^[0-9]+$/.test(phone)) {
        toast.error("Phone number should only contain digits");
        return;
      }

      const res = await createMemberMutation({ 
        name, 
        phone, 
        email, 
        status: true 
      }).unwrap();

      if (res?.error) {
        toast.error(res.error.data?.message || res.error.data || "Failed to create user");
        return;
      }

      toast.success("Account created successfully! Redirecting...");
      
      if (res?.accessToken) {
        saveTokenToCookie(res.accessToken);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("User creation error:", error);
      toast.error(error.data?.message || "Failed to create account. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex justify-center">
          <h2 className="text-5xl font-bold">Member Register Your Account</h2>
          <ToastContainer />
        </CardHeader>
        <CardBody>
          <form onSubmit={onSubmitHandler} className="flex flex-col space-y-4 text-lg gap-2">
            <Input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter your full name.."
              startContent={<MdDriveFileRenameOutline />}
              required
            />
            <Input
              type="email"
              value={email}
              placeholder="Enter your email"
              startContent={<MdOutlineAlternateEmail />}
              required
              readOnly // Email comes from Redux; make it non-editable
            />
            <Input
              type="text" // Use text for better input control
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter your Mobile No."
              startContent={<MdOutlineSmartphone />}
              required
            />
            <Button type="submit" color="primary" className="w-full">
              Register
            </Button>
          </form>
            <div className="text-center">
              <Link color="foreground" href="/login">
                Back to Login
              </Link>
            </div>
        </CardBody>
      </Card>
    </div>
  );
}
