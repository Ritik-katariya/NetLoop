import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout, selectCurrentAdmin } from '../../redux/features/admin/adminSlice';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FaUserShield } from 'react-icons/fa';

const SuperAdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentAdmin = useSelector(selectCurrentAdmin);

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate('/super-admin/login');
  };

  return (
    <Navbar isBordered className="bg-white">
      <NavbarBrand>
        <FaUserShield className="text-2xl text-primary mr-2" />
        <p className="font-bold text-inherit">Super Admin Panel</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name={currentAdmin?.name}
              size="sm"
              src="https://i.pravatar.cc/150"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{currentAdmin?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">Settings</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              <div className="flex items-center gap-2">
                <FiLogOut />
                Log Out
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default SuperAdminHeader; 