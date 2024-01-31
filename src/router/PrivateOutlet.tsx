import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../DB/AuthProvider';

function PrivateOutlet() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

export default PrivateOutlet;
