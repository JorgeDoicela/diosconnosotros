import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LinksPage from './pages/LinksPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Si entran a la raíz, los mandamos a /links de forma interna */}
        <Route path="/" element={<Navigate to="/links" replace />} />
        
        {/* Esta es tu página principal de botones */}
        <Route path="/links" element={<LinksPage />} />
        
        {/* Eliminamos la ruta /go de aquí, la dejaremos solo en Vercel */}
        <Route path="*" element={<Navigate to="/links" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)