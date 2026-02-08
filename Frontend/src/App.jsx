import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Train from './pages/Train';
import Logs from './pages/Logs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Wrapper */}
        <Route path="/" element={<MainLayout />}>
          
          {/* Default Path (Dashboard) */}
          <Route index element={<Dashboard />} />
          
          {/* Sub-pages */}
          <Route path="train" element={<Train />} />
          <Route path="logs" element={<Logs />} />

          {/* Fallback for 404s */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;