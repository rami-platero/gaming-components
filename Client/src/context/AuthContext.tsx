import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useGetUserQuery } from "../redux/services/userApi";
import { useAppDispatch } from "../redux/hooks";
import { setCredentials,logOut } from "../redux/features/user/userSlice";

export interface ContextProps {
  children: JSX.Element;
}

interface IContext {
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

export const authContext = createContext<IContext>({
  logout: () => {},
  isAuthenticated: false,
  loading: false,
});

export const AuthContextProvider = ({ children }: ContextProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { data, isSuccess } = useGetUserQuery(null);

  const dispatch = useAppDispatch();

  const logout = async () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    dispatch(logOut(null))
  };

  useEffect(()=>{
    if(data && isSuccess){
      setIsAuthenticated(true)
      setLoading(false)
      dispatch(setCredentials(data))
    }
    setLoading(false)

  },[data])

  return (
    <authContext.Provider value={{ logout, isAuthenticated, loading }}>
      {children}
    </authContext.Provider>
  );
};
