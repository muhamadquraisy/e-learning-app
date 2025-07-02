import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({ allowedRole }) => {
  const role = localStorage.getItem('role');
  if (!role) return <Navigate to="/" />;

  return allowedRole.includes(role) ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;