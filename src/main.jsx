import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'react-confirm-alert/src/react-confirm-alert.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='contact-management-app'>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
