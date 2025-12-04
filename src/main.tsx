import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './pages/landingpage'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  </StrictMode>
);
