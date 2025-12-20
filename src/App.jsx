import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LinksPage from './pages/LinksPage';
import RedirectPage from './pages/RedirectPage';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal redirige a /links */}
        <Route path="/" element={<Navigate to="/links" replace />} />
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
