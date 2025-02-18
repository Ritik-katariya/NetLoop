import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getTokenFromCookie } from '../../utils/cookeeSet';
import jwtDecode from 'jwt-decode';
import { memberInfo } from '../../utils/auth';
const MemberRoute = () => {
 
const member=memberInfo();


  if (!member) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default MemberRoute; 