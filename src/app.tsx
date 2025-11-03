import { Route, Routes, useNavigate } from "react-router-dom"
import LandingPage from "./pages/landingpage";
import { SignInPage } from "./pages/sign-in";
import { ForgotPasswordForm } from "./pages/forgotPassword";

export const App:React.FC = function(){

    const navigate = useNavigate();

    return <Routes>
        <Route path='/' element= {<LandingPage onBackToSignUp={()=>navigate("/sign-up")} onBackToSignIn={()=>navigate("/sign-in")}/>} />
        <Route path='/sign-in' element= {<SignInPage onBackToSignUp={()=>navigate("/sign-in")} toForgotPassword="/forgot-password" toSignUp="/sign-up"/>} />
        <Route path='/forgot-password' element={<ForgotPasswordForm toSignUp="/sign-up"/>}/>
      </Routes>

}