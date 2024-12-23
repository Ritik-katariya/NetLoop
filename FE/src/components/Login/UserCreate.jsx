import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { MdOutlineSmartphone } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useCreateMemberMutation } from "../../redux/api/member";
export default function UserCreate() {
  const [createMemberMutation] = useCreateMemberMutation();
  const [name, setname] = useState("");
  const [phone, setphone] = useState(null)
  const email="matrix.002808@gmail.com";

  const onSubmit = async(e) => {
    e.preventDefault();
    // Implement password reset logic here
    const res=await createMemberMutation({ name, phone, email });
    console.warn("user create successfully"+res);
    console.log("Signup attempt with:", { name, phone, email,status:true });
    console.log("OTP verify requested for:", email);
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
     <form onSubmit={onSubmit} className="flex flex-col space-y-4 text-lg gap-2">
       <Input
         type="text"
         // label="Email"
         value={name}
         onChange={(e) => setname(e.target.value)}
         placeholder="Enter your full name.."
         startContent={<MdDriveFileRenameOutline />}
         required
       />
        <Input
          type="email"
          // label="Email"
          value={email}
          // onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          startContent={<MdOutlineAlternateEmail />}
          required
        />
        <Input
          type="number"
          // label="Email"
          maxLength={10}
          minLength={10}
          errorMessage="Please enter 10 digits number"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
          placeholder="Enter your Mobile No."
          startContent={<MdOutlineSmartphone />
          }
          required
        />
        {phone?.length !== 10 && <p>Phone number digit should be 10</p>}

        <Button type="submit" color="primary" className="w-full">
          Register
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
