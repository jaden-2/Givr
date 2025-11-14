import { Route, Routes, } from "react-router-dom"
import SelectRole from "../components/Volunteer/sign-up/SelectRole";

import type { BasicNatigationProps } from "../interface/interfaces";
import { SignupProvider } from "../components/Volunteer/sign-up/SignupContext";
import { VolunteerSignup } from "./Volunteer/volunteerSignup";

export const SignUpPage: React.FC<BasicNatigationProps> = () => {

    return (
        <SignupProvider>
            <Routes>
                <Route index element={<SelectRole isSignin={false}/>} />
                <Route path="volunteer" element={<VolunteerSignup/>}/>
                <Route path="organization"/>
            </Routes>
        </SignupProvider>
    )
}