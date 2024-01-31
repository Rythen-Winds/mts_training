import { Link } from 'react-router-dom';

const PlaylistPage = () => {
  return (
    <div className='flex justify-center items-center gap-4 flex-col p-4'>
      <Link
        to={'/playlists/edit'}
        className='bg-accent px-4 py-2 rounded-lg'
      >
        Edit
      </Link>
      <Link
        to={'/playlists/assign'}
        className='bg-accent px-4 py-2 rounded-lg'
      >
        Assign
      </Link>
    </div>
  );
};

export default PlaylistPage;
