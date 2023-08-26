import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useGetUserQuery } from "../redux/services/userApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCredentials,logOut } from "../redux/features/user/userSlice";

export interface ContextProps {
  children: JSX.Element;
}

interface IContext {
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  authenticate: ()=>void
}

export const authContext = createContext<IContext>({
  logout: () => {},
  isAuthenticated: false,
  loading: false,
  authenticate: ()=>{}
});

export const AuthContextProvider = ({ children }: ContextProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useAppSelector(state=>state.user)
  const { data, isSuccess } = useGetUserQuery(null, {
    skip: user!==null
  });
  const dispatch = useAppDispatch();

  const authenticate = ()=>{
    setIsAuthenticated(true)
  }

  const logout = async () => {
    Cookies.remove("token");
    dispatch(logOut(null))
    setIsAuthenticated(false);
    window.location.reload()
  };

  useEffect(()=>{
    if(user) {
      setIsAuthenticated(true)
      setLoading(false)
      return
    }
    if(data && isSuccess){
      dispatch(setCredentials(data))
      setIsAuthenticated(true)
      setLoading(false)
    } else if (!data && !isSuccess){
      setIsAuthenticated(false)
      setLoading(false)
    } 
  },[data])


  return (
    <authContext.Provider value={{ logout, isAuthenticated, loading, authenticate }}>
      {children}
    </authContext.Provider>
  );
};
