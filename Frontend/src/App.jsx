import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Train from './pages/Train';
import Logs from './pages/Logs';
import Playground from './pages/Playground'; // Ensure this matches your file name

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout wraps all pages so Sidebar is always visible */}
        <Route path="/" element={<MainLayout />}>
          
          {/* Default Page (Dashboard) */}
          <Route index element={<Dashboard />} />
          
          {/* Functional Pages */}
          <Route path="train" element={<Train />} />
          <Route path="logs" element={<Logs />} />
          <Route path="playground" element={<Playground />} /> 
          
          {/* Catch-all: Redirect unknown URLs to Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;