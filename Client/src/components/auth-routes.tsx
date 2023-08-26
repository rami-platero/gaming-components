import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const { isAuthenticated, loading } = useContext(authContext);
  if (!loading && isAuthenticated) return <Navigate to={"/"} replace />;
  return <Outlet />;
};

export default AuthRoutes;