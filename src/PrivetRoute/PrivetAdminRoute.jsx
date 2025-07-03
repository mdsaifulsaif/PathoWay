import React, { use } from "react";
import useUserRole from "../Hooks/useUserRole";
import LoddingPage from "../pages/LoddingPage";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { Navigate } from "react-router";

function PrivetAdminRoute({ children }) {
  // const { user, loadding } = use(AuthContext);
  const { role, loadding } = useUserRole();
  if (loadding) {
    return <LoddingPage></LoddingPage>;
  }

  if (role !== "admin") {
    return <Navigate to="/forbidden"></Navigate>;
  }
  return children;
}

export default PrivetAdminRoute;
