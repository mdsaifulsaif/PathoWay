import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./../contexts/AuthContext/AuthContext";
import LoddingPage from "../pages/LoddingPage";

function PrivetRoute({ children }) {
  const { user, loading } = use(AuthContext);

  const location = useLocation();

  if (loading) {
    return <LoddingPage></LoddingPage>;
  }

  if (user && user.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
}

export default PrivetRoute;
