import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LinksPage from './pages/LinksPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/links" />} />
        <Route path="/links" element={<LinksPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)