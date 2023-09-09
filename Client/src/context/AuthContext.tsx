import { createContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  handleLoading,
  setCredentials,
} from "../redux/features/user/authSlice";
import { useGetUserQuery } from "../redux/services/authApiSlice";

export interface ContextProps {
  children: JSX.Element;
}

interface IContext {}

export const authContext = createContext<IContext>({});

export const AuthContextProvider = ({ children }: ContextProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const { data, isFetching,isError } = useGetUserQuery(null, {
    skip: user !== null,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!isFetching){
      if(isError){
        dispatch(handleLoading(false));
      } else {
        dispatch(setCredentials(data))
      }
    }
  }, [isFetching]);

  return <authContext.Provider value={{}}>{children}</authContext.Provider>;
};
