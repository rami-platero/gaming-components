import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const AuthRoutes = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  if (isAuthenticated) return <Navigate to={"/"} replace />;
  return <Outlet />;
};

export default AuthRoutes;