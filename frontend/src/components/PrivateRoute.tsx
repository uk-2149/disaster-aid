import * as React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdminLoggedIn = localStorage.getItem("token") !== null;

  return isAdminLoggedIn ? children : <Navigate to="/adminlogin" />;
};

export default PrivateRoute;
