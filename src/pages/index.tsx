import { Route, Routes, useNavigate } from "react-router-dom"
import LandingPage from "./landingpage"
import { SignInPage } from "./signIn"
import { SignUpPage } from "./signup"
import { ForgotPasswordForm } from "../components/forgotPassword"
import { PageNotFound } from "./Volunteer/404 Page"
import { VolunteerApp } from "../volunteerApp"
import { OrganizationApp } from "../organizationApp"

export const IndexPage = ()=>{
    const navigate = useNavigate()

    return <>
        <Routes>

          <Route index element={<LandingPage onToSignUp={() => navigate("/signup")} onToSignIn={() => navigate("/signin")} />} />
          <Route path='signin/*' element={<SignInPage onToDashboard={() => navigate("/dashboard")} onToSignUp={() => navigate("/signin")} toForgotPassword="/forgot-password" toSignUp="/signup" />} />
          <Route path='signup/*' element={<SignUpPage />} />
          <Route path='forgot-password' element={<ForgotPasswordForm toSignUp="/signup" />} />   
               
          <Route path='/volunteer' element={<VolunteerApp/>}/>
          <Route path='/organization' element={<OrganizationApp/>}/>

          <Route path="*" element={<PageNotFound toDashBoard="/dashboard" />} />
        </Routes>
        </>
}