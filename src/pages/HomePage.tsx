import { useAuth } from '../DB/AuthProvider';
import LogOut from '../components/LogOut.tsx';
import Login from '../components/Login';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div>Welcome to MTS Training</div>

      {!isAuthenticated ? <Login /> : <LogOut />}
    </>
  );
};

export default HomePage;
