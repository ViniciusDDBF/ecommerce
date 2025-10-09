import type { FC } from '@/types';
import { Navigate, Outlet } from 'react-router';
import { LoadingOverlay } from '@/components/atoms';
import { useAppSelector } from '@/store/hooks/hooks';

export const PrivateRoute: FC = () => {
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
    return <Navigate replace to="/" />;
  }

  // Otherwise, render the child route
  return <Outlet />;
};
