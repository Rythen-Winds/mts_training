import { addPlayListToUser } from '../DB/supabase';
import { UserRow } from '../DB/types';

const UnassignedUserCard = ({
  user,
  playlist_id,
  assign,
}: {
  user: UserRow;
  playlist_id: number;
  assign: (user: UserRow) => void;
}) => {
  const handleClick = () => {
    addPlayListToUser(user.id, playlist_id);
    assign(user);
  };
  return (
    <div className='p-4 bg-red-500 flex flex-row justify-between items-center'>
      <h1>{user.userName}</h1>
      <button
        className='p-4'
        onClick={handleClick}
      >
        +
      </button>
    </div>
  );
};

export default UnassignedUserCard;
