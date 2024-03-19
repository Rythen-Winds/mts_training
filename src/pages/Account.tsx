import { Link } from 'react-router-dom';
import LogOut from '../components/LogOutButton';

const Account = () => {

  return (
    <>
      <Link to='/account/changePassword'>Change Password</Link>
      <LogOut />
    </>
  );
};

export default Account;
