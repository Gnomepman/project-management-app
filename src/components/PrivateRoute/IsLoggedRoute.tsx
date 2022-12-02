import React from 'react';
import { isAuthenticated } from '../../utils/isAuthenticated';
import { Navigate, Outlet } from 'react-router-dom';

export const IsLoggedRoute = () => {
  return isAuthenticated() ? <Navigate to="/boards" /> : <Outlet />;
};
