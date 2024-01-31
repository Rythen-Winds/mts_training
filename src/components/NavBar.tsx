import { Link } from 'react-router-dom';
import { useAuth } from '../DB/AuthProvider';

const NavBar = () => {
  const { isAdmin } = useAuth();

  return (
    <nav className=''>
      <ul className='flex w-full justify-between gap-0.5 p-0.5 bg-slate-800'>
        <li className='flex-grow'>
          <Link
            to={'/'}
            className='block p-4 bg-slate-100'
          >
            MTS Training
          </Link>
        </li>
        <li className='flex-grow'>
          <Link
            to={'watch'}
            className='block p-4 bg-slate-100'
          >
            Training Videos
          </Link>
        </li>
        {/* TODO add Reports here */}
        {isAdmin && (
          <li className='flex-grow'>
            <Link
              to={'playlists'}
              className='block p-4 bg-slate-100'
            >
              Playlists
            </Link>
          </li>
        )}
        <li className='flex-grow'>
          <Link
            to={'account'}
            className='block p-4 bg-slate-100'
          >
            My account
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
