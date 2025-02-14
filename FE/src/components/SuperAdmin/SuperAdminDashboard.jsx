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
        
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">Welcome, {currentAdmin?.name}</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardBody>
                <h3 className="text-lg font-semibold">Total Admins</h3>
                <p className="text-3xl font-bold text-primary">{stats.totalAdmins}</p>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody>
                <h3 className="text-lg font-semibold">Active Admins</h3>
                <p className="text-3xl font-bold text-success">{stats.activeAdmins}</p>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody>
                <h3 className="text-lg font-semibold">Inactive Admins</h3>
                <p className="text-3xl font-bold text-danger">{stats.inactiveAdmins}</p>
              </CardBody>
            </Card>
          </div>

          {/* Admin List */}
          <AdminList admins={admins} />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard; 