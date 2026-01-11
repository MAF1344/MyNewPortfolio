// import {useState, useEffect} from 'react';
import './index.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />

          {/* Route yang diproteksi */}
          <Route element={<ProtectedRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
