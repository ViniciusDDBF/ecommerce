import { createBrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './store/store';
import RootLayout from './layouts/RootLayout';
import ProductsPage, { productsLoader } from './pages/ProductsPage';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import AuthCallback from './pages/AuthCallback';
import { rootLoader } from './loaders/rootLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <RootLayout />
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
    ],
  },
]);
