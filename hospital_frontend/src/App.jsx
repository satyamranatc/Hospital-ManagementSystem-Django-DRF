import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import AdminSection from './pages/AdminSection';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="patients" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="admin-section" element={<AdminSection />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
