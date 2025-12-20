import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LinksPage from './pages/LinksPage'
import { siteConfig } from './data/config'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/links" />} />
        <Route path="/links" element={<LinksPage />} />
        
        {/* NUEVO: Esta ruta atrapa el /go y lo redirige según tu config.js */}
        <Route path="/go" element={
          <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
            <p className="animate-pulse text-slate-400">Redirigiendo...</p>
            {/* Lógica de redirección instantánea */}
            {window.location.replace(siteConfig.qrRedirectUrl)}
          </div>
        } />

        {/* Ruta de seguridad para errores 404 */}
        <Route path="*" element={<Navigate to="/links" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)