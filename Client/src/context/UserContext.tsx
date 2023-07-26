import { createContext, useEffect, useState } from "react";
import axios from "../libs/axios";
import { IUser } from "../types";
import Cookies from "js-cookie";

export interface ContextProps {
  children: JSX.Element;
}

interface IContext {
  user: IUser | null;
  logout: () => void;
  isAuthenticated: boolean
  loading: boolean
}

export const userContext = createContext<IContext>({
  user: null,
  logout: () => {},
  isAuthenticated: false,
  loading: false
});

export const UserContextProvider = ({ children }: ContextProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  const logout = async () => {
    Cookies.remove("token")
    setIsAuthenticated(false)
    setUser(null)
  };

  const getUser = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/auth/getUser");
      if (
        !res.data ||
        !(typeof res.data === "object" && Object.keys(res.data).length > 0)
      ) {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false)
        return;
      }
      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false)
      return;
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false)
    }
  };

  useEffect(() => {
    const cookies = Cookies.get();

    if (!cookies.token) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false)
      return
    }

    getUser()

  }, []);


  return (
    <userContext.Provider value={{ user, logout, isAuthenticated, loading }}>
      {children}
    </userContext.Provider>
  );
};
