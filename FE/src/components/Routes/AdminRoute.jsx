import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAdminToken, selectCurrentAdmin } from '../../redux/features/admin/adminSlice';

const AdminRoute = () => {
  const token = useSelector(selectAdminToken);
  const admin = useSelector(selectCurrentAdmin);

  if (!token || !admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute; 