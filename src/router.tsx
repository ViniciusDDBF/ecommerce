import { createBrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import RootLayout from './layouts/RootLayout';
import ProductsPage, { productsLoader } from './pages/ProductsPage';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <RootLayout />
      </Provider>
    ),
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'products',
        element: <ProductsPage />,
        loader: productsLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
