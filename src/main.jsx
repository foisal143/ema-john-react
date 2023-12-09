import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Products from './components/Products/Products.jsx';
import OrderReview from './components/OrderReview/OrderReview.jsx';
import reviewLoader from './Loaders/Loaders.js';
import Login from './components/Login/Login.jsx';
import Registation from './components/Registation/Registation.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import CheckOutPage from './components/CheckoutPage/CheckOutPage.jsx';
import UserContext from './UserContext/UserContext.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Products></Products>,
      },
      {
        path: 'review',
        element: <OrderReview></OrderReview>,
        loader: reviewLoader,
      },
      {
        path: 'orders',
        element: (
          <PrivateRoute>
            <CheckOutPage></CheckOutPage>
          </PrivateRoute>
        ),
      },
      {
        path: 'inventory',
        element: <p>This is inventory page</p>,
      },
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'registation',
        element: <Registation></Registation>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContext>
      <RouterProvider router={router} />
    </UserContext>
  </React.StrictMode>
);
