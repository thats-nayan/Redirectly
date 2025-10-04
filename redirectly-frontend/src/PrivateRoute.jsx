import React from 'react'
import { Navigate } from 'react-router-dom';
import { ContextApi } from "./contextApi/ContextApi";
import { useContext } from 'react';

// children is the special prop that is automatically passed to components
// that are nested inside the component tag
// publicPage is a boolean prop to indicate if the route is public or private

export default function PrivateRoute({ children, publicPage }) {
  const { token } = useContext(ContextApi);

  if(publicPage){
    return token ? <Navigate to="/dashboard" /> : children;
  }
  return !token ? <Navigate to="/login" /> : children;
}