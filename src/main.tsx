import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/hooks/useAuth'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App/>
      </AuthProvider>
     </BrowserRouter>
  </StrictMode>,
)
