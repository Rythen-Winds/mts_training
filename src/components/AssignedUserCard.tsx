import { removePlaylistFromUser } from '../DB/supabase';
import { UserRow } from '../DB/types';

const AssignedUserCard = ({
  user,
  playlist_id,
  unassign,
}: {
  user: UserRow;
  playlist_id: number;
  unassign: (user: UserRow) => void;
}) => {
  const handleClick = () => {
    removePlaylistFromUser(user.id, playlist_id);
    unassign(user);
  };
  return (
    <div className='p-4 bg-green-500 flex flex-row justify-between items-center'>
      <h1>{user.userName}</h1>
      <button
        className='p-4'
        onClick={handleClick}
      >
        -
      </button>
    </div>
  );
};

export default AssignedUserCard;
