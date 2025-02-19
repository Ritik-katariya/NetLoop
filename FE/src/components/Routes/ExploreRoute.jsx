import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { getTokenFromCookie } from '../../utils/cookeeSet';
import jwtDecode from 'jwt-decode';
import { memberInfo } from '../../utils/auth';
import { useSelector } from 'react-redux';
const ExploreRoute = () => {

const {memberData}=useSelector(state=>state.member);
console.log(memberData);
  if (memberData.networks.length === 0) {
    return <Navigate to="/network" replace />;
  }

  return <Outlet />;
};

export default ExploreRoute; 