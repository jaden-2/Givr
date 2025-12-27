import React, { createContext, useContext, useEffect, useState } from "react";

export type AuthenticatedContextType= {
    isAuthenticated: Boolean;
    
    logout:()=>void;
    signin: ()=>void;
}
const AuthContext = createContext<AuthenticatedContextType | undefined>(undefined)

export const AuthenticatedFlagProvider: React.FC<{children:React.ReactNode}> = ({children})=>{

    const [isAuthenticated, setIsAuthenicated] = useState<Boolean>(false);
   
    const logout = ()=>{
        setIsAuthenicated(false)
    }

    const signin = ()=>{
        
        setIsAuthenicated(true)
    }

    useEffect(()=>{
        console.log(isAuthenticated)
    }, [])
    console.log("AuthProvider render");


    return <AuthContext.Provider value={{isAuthenticated, logout, signin}}>
        {children}
    </AuthContext.Provider>
}

export const useVerifyAuth = ()=>useContext(AuthContext)