import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AccountLayout from './layouts/AccountLayout';
import ProductPage from '../pages/ProductPage';
import HomePage from '../pages/HomePage';
import ErrorPage from '../pages/ErrorPage';
import AuthCallback from '../pages/AuthCallback';
import { rootLoader } from './loaders/rootLoader';
import { productLoader } from './loaders/productLoader';
import { homeLoader } from './loaders/homeLoader';
import { LoadingOverlay } from '../components/atoms';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    loader: rootLoader,
    HydrateFallback: LoadingOverlay,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: homeLoader },
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
