import { useNavigate } from 'react-router-dom';
import { logout } from '../DB/supabase';

const Account = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    logout();
    navigate('/');
  };
  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default Account;
