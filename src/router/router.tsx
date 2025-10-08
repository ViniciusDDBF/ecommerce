import { createBrowserRouter } from 'react-router-dom';
import { LoadingOverlay } from '@/components/atoms';
import { AuthCallback } from '../pages/AuthCallback';
import { ErrorPage } from '../pages/ErrorPage';
import { Homepage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { AccountLayout } from './layouts/AccountLayout';
import { RootLayout } from './layouts/RootLayout';
import { homeLoader } from './loaders/homeLoader';
import { productLoader } from './loaders/productLoader';
import { rootLoader } from './loaders/rootLoader';
import { PrivateRoute } from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    loader: rootLoader,
    HydrateFallback: LoadingOverlay,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage />, loader: homeLoader },
      {
        path: '/products/:slug',
        element: <ProductPage />,
        loader: productLoader,
      },
      {
        path: 'auth/callback',
        element: <AuthCallback />,
      },
      {
        path: 'account',
        element: <PrivateRoute />,
        children: [
          { index: true, element: <AccountLayout /> },
          { path: ':section', element: <AccountLayout /> },
        ],
      },
    ],
  },
]);
