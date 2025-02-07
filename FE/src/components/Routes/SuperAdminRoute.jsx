import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAdminToken, selectCurrentAdmin } from '../../redux/features/admin/adminSlice';

const SuperAdminRoute = () => {
  const token = useSelector(selectAdminToken) || '';
  const admin = useSelector(selectCurrentAdmin) || null;

  if (!token || !admin) {
    return <Navigate to="/super-admin/login" replace />;
  }

  if (admin?.role !== 'SUPER_ADMIN') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default SuperAdminRoute; 