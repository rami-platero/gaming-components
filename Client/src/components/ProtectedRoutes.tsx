import { useContext } from "react";
import { userContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useContext(userContext);
  if (!loading && !isAuthenticated) return <Navigate to={"/"} replace />;
  return <Outlet />;
};

export default ProtectedRoutes;
