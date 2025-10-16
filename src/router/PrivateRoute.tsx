import type { FC } from '@/types';
import { Navigate, Outlet } from 'react-router';
import { LoadingOverlay } from '@/components/atoms';
import { useAppSelector } from '@/store/hooks/hooks';

export const PrivateRoute: FC = () => {
  const user = useAppSelector('user');

  if (user.isLoading === undefined || user.isLoading) {
    return (
      <>
        <Outlet />
        <LoadingOverlay />
      </>
    );
  }

  if (!user.user) {
    return <Navigate replace to="/" />;
  }

  return <Outlet />;
};
