import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LinksPage from './pages/LinksPage';
import RedirectPage from './pages/RedirectPage';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal y /links renderizan la página de enlaces */}
        <Route path="/" element={<LinksPage />} />
        <Route path="/links" element={<LinksPage />} />

        {/* Ruta del QR dinámico */}
        <Route path="/go" element={<RedirectPage />} />

        {/* Cualquier otra ruta redirige a /links */}
        <Route path="*" element={<Navigate to="/links" replace />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
