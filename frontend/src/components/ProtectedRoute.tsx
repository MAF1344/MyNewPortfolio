import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');
  
  // Jika tidak ada token, tendang balik ke halaman login
  return token ? <Outlet /> : <Navigate to="/login" />;
}