import React, { useContext } from 'react';
import { ContextUser } from '../UserContext/UserContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(ContextUser);
  const location = useLocation();
  console.log(location);
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ form: location }} replace></Navigate>;
};

export default PrivateRoute;
