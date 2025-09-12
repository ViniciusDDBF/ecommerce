import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import ProductsPage, { productsLoader } from '../pages/ProductsPage';
import HomePage from '../pages/HomePage';
import ErrorPage from '../pages/ErrorPage';
import AuthCallback from '../pages/AuthCallback';
import { rootLoader } from './loaders/rootLoader';
import AccountLayout from './layouts/AccountLayout';
import PrivateRoute from './PrivateRoute';
import LoadingOverlay from '../components/LoadingOverlay';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    loader: rootLoader,
    HydrateFallback: LoadingOverlay,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'products',
        element: <ProductsPage />,
        loader: productsLoader,
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
