import { Route, Routes } from "react-router-dom"
import { DashboardPage } from "./pages/Organization/dashboardPage" 

export const OrganizationApp: React.FC = function () {
    return <Routes>
        <Route index element={<DashboardPage />} />
    </Routes>
}