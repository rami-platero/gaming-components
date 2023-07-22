import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {AxiosResponse} from 'axios'
import { IUser } from "../types";

export interface ContextProps {
  children: JSX.Element;
}

interface IContext {user: IUser | null}

export const userContext = createContext<IContext>({user:null});

export const UserContextProvider = ({ children }: ContextProps) => {

    const [user, setUser] = useState<IUser | null>(null)

    useEffect(()=>{
        axios.get("/auth/getGoogleUser",{withCredentials: true}).then((res:AxiosResponse)=>{
            if(res.data){
                setUser(res.data.user)
            }
        }).catch(err=>{
            console.error(err)
        })
    },[])
  return <userContext.Provider value={{user}}>{children}</userContext.Provider>;
};
