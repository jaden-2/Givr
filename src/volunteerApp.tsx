import { Route, Routes, } from "react-router-dom"

import { PageNotFound } from "./pages/Volunteer/404 Page";
import { DashboardPage } from "./pages/Volunteer/dashboardPage";

export const VolunteerApp: React.FC = function () {

  return <>
    <Routes>
      <Route index element={<DashboardPage  />} />
      <Route path="*" element={<PageNotFound toDashBoard="/dashboard" />} />
    </Routes>

  </>

}