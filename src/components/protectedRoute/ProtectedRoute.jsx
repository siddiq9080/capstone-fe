import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Layout/Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import PageNotFound from "../PageNotFound";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { isAuthenticated, loading, user, error } = useSelector(
    (state) => state.authState
  );

  useEffect(() => {
    if (!loading && !isAuthenticated && !error) {
      toast.info("Please log in to continue.");
    }
  }, [loading, isAuthenticated, error]);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated) {
    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/" />;
    }
    return children;
  }

  return null;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  isAdmin: PropTypes.bool,
};

export default ProtectedRoute;
