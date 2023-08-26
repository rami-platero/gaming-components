import { Navigate, Outlet } from "react-router-dom";
import { Roles } from "../types";
import { useAppSelector } from "../redux/hooks";

type Props = {
  allowedRoles: Roles[];
};

const ProtectedRoutes = ({ allowedRoles }: Props) => {
  const user = useAppSelector(state=>state.user)

  return user?.roles.find(role=> {
    return allowedRoles.includes(role)
  })? <Outlet/> : <Navigate to={"/"} replace/>
};

export default ProtectedRoutes;
