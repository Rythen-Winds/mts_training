import { useNavigate } from 'react-router-dom';
import { logout } from '../DB/supabase';

const LogOutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      logout();
      navigate('/');
    } catch {}
  };
  return (
    <button
      onClick={handleLogout}
      className='bg-accent py-2 px-4 rounded-lg'
    >
      LogOut
    </button>
  );
};

export default LogOutButton;
