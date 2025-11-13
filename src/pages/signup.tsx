import { Route, Routes, useNavigate } from "react-router-dom"
import SelectRole from "../components/sign-up/SelectRole";
import UserDetails from "../components/sign-up/UserDetails";
import PickInterests from "../components/sign-up/PickInterests";
import type { BasicNatigationProps } from "../interface/interfaces";
import { SignupProvider } from "../components/sign-up/SignupContext";

export const SignUpPage:React.FC<BasicNatigationProps> = ()=>{
    const navigate = useNavigate();

    return (
        <SignupProvider>
            <Routes>
                <Route index element={<SelectRole toVolunteerDetails="details"/>} />
                <Route path="details" element={<UserDetails onToInterest={()=>navigate("../interests", {relative: "path"})}/>} />
                <Route path="interests" element={<PickInterests onToSignIn={()=>navigate("/signin")} />} />
            </Routes>
        </SignupProvider>
    )
}