import { Navigate } from "react-router-dom"
import { useVerifyAuth } from "./AuthContext"

export const RequireAuth:React.FC<{children:React.ReactNode}> = ({children})=>{
    const verifyAuth = useVerifyAuth()

    return verifyAuth?.isAuthenticated? children : <Navigate to={"/signin"} replace/>
}