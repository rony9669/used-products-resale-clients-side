import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import useOwner from "../../Hooks/useOwner";
import { Spinner } from "react-bootstrap";
import "./PrivateRoute.css";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useOwner(user?.email);
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Spinner animation="border" className="loading" variant="primary" />;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
