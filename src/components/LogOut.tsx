import { logout } from '../DB/supabase';

const LogOut = () => {
  const handleLogout = () => {
    logout();
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

export default LogOut;
