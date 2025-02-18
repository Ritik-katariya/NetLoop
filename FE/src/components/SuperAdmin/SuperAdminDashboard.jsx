import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentAdmin } from '../../redux/features/admin/adminSlice';
import { Card, CardBody } from "@nextui-org/react";
import { useGetAllAdminsQuery } from '../../redux/api/adminApi';
import AdminList from './AdminList';
import SuperAdminHeader from './SuperAdminHeader';
import SuperAdminSidebar from './SuperAdminSidebar';

const SuperAdminDashboard = () => {
  const currentAdmin = useSelector(selectCurrentAdmin);
  const { data: admins, isLoading } = useGetAllAdminsQuery();

  const stats = {
    totalAdmins: admins?.length || 0,
    activeAdmins: admins?.filter(admin => admin.status).length || 0,
    inactiveAdmins: admins?.filter(admin => !admin.status).length || 0
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <SuperAdminHeader />
      
      <div className="flex">
        <SuperAdminSidebar />

      </div>
    </div>
  );
};

export default SuperAdminDashboard; 