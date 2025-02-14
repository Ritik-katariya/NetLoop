import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { useLoginSuperAdminMutation } from '../../redux/api/superAdminApi';
import { useDispatch } from 'react-redux';
import { setAdminCredentials } from '../../redux/features/admin/adminSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

const SuperAdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginSuperAdmin] = useLoginSuperAdminMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        toast.error('Please fill in all fields');
        return;
      }

      const res = await loginSuperAdmin({ email, password }).unwrap();
   
      if (res?.error) {
        toast.error(res.error.data?.message || res.error.data || 'Login failed');
        return;
      }

      if (!res?.accessToken) {
        toast.error('Invalid response from server');
        return;
      }

      dispatch(setAdminCredentials({
        accessToken: res.accessToken,
        admin: {
          id: res.id,
          email: res.email,
          name: res.name,
          role: 'SUPER_ADMIN'
        }
      }));

      toast.success('Login successful');
      navigate('/super-admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Super Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
              </button>
            }
            required
          />

          <Button 
            type="submit" 
            color="primary" 
            className="w-full"
          >
            Login
          </Button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SuperAdminLogin; 