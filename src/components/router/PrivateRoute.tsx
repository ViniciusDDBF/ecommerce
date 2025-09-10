import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import LoadingOverlay from '../LoadingOverlay';

const PrivateRoute: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const isLoading = useSelector((state: RootState) => state.user.isLoading); // Optional: track loading state if you have it

  // If still loading (PersistGate + fetch), show overlay
  if (isLoading === undefined || isLoading) {
    return (
      <>
        <Outlet />
        <LoadingOverlay />
      </>
    );
  }

  // If user is not logged in, redirect to home or login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the child route
  return <Outlet />;
};

export default PrivateRoute;
