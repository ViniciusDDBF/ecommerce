import React from 'react';
import { Navigate, Outlet } from 'react-router';
import LoadingOverlay from '../components/LoadingOverlay';
import { useAppSelector } from '../store/hooks/hooks';

const PrivateRoute: React.FC = () => {
  const user = useAppSelector('user');

  // If still loading (PersistGate + fetch), show overlay
  if (user.isLoading === undefined || user.isLoading) {
    return (
      <>
        <Outlet />
        <LoadingOverlay />
      </>
    );
  }

  // If user is not logged in, redirect to home or login
  if (!user.user) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the child route
  return <Outlet />;
};

export default PrivateRoute;
