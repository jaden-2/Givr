import { Route, Routes, } from "react-router-dom"
import { DashboardPage } from "./pages/Volunteer/dashboardPage";
import { PageNotFound } from "./pages/Volunteer/404 Page";


export const VolunteerApp: React.FC = function () {

  return <>
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path="*" element={<PageNotFound toDashBoard="/dashboard" />} />
    </Routes>

  </>

}