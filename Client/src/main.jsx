import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import RenderRoutes from './routes/index.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RenderRoutes />
    </BrowserRouter>
  </StrictMode>,
)
