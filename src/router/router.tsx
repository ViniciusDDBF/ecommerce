import { createBrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store, { persistor } from '../store/store';
import RootLayout from './layouts/RootLayout';
import ProductsPage, { productsLoader } from '../pages/ProductsPage';
import HomePage from '../pages/HomePage';
import ErrorPage from '../pages/ErrorPage';
import AuthCallback from '../pages/AuthCallback';
import { rootLoader } from './loaders/rootLoader';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingOverlay from '../components/LoadingOverlay';
import AccountLayout from './layouts/AccountLayout';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <PersistGate loading={<LoadingOverlay />} persistor={persistor}>
          <RootLayout />
        </PersistGate>
      </Provider>
    ),
    loader: rootLoader,
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
        element: <PrivateRoute />, // Protect account routes
        children: [
          { index: true, element: <AccountLayout /> }, // /account
          { path: ':section', element: <AccountLayout /> }, // /account/orders, /account/wishlist
        ],
      },
    ],
  },
]);
