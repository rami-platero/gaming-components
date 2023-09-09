import { Navigate, Outlet } from "react-router-dom";
import { Roles } from "../types";
import { useAppSelector } from "../redux/hooks";

type Props = {
  allowedRoles: Roles[];
};

const ProtectedRoutes = ({ allowedRoles }: Props) => {
  const auth = useAppSelector(state=>state.auth)

  if(auth.loading){
    return
  }

  return auth?.user?.roles.find(role=> {
    return allowedRoles.includes(role)
  })? <Outlet/> : <Navigate to={"/"} replace/>
};

export default ProtectedRoutes;
