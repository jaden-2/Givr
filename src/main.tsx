import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import LandingPage from './pages/landingpage'
import SelectRole from './components/sign-up/SelectRole';
import UserDetails from './components/sign-up/UserDetails';
import PickInterests from './components/sign-up/PickInterests';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup-select-role" element={<SelectRole />} />
        <Route path="/signup-user-details" element={<UserDetails />} />
        <Route path="/signup-pick-interests" element={<PickInterests />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
