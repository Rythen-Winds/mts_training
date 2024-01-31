import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { PlaylistRow, UserRow, UserRows } from '../DB/types';
import AssignedUserCard from './AssignedUserCard';
import ExpandButton from './ExpandButton';
import UnassignedUserCard from './UnassignedUserCard';

const PlaylistUserCard = ({ playlist }: { playlist: PlaylistRow }) => {
  const { users } = useLoaderData() as { users: UserRows };
  const [assignedUsers, setAssignedUsers] = useState<UserRows>([]);
  const [unassignedUsers, setUnassignedUsers] = useState<UserRows>([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // Categorize users into assigned and unassigned lists
    const newAssignedUsers: UserRows = [];
    const newUnassignedUsers: UserRows = [];

    for (const user of users) {
      if (assignedUsers.includes(user) || unassignedUsers.includes(user)) {
        continue;
      }

      if (user.playlists.includes(playlist.id)) {
        newAssignedUsers.push(user);
      } else {
        newUnassignedUsers.push(user);
      }
    }

    setAssignedUsers(() => [...newAssignedUsers]);
    setUnassignedUsers(() => [...newUnassignedUsers]);
  }, [users, playlist.id]);

  const unassign = (user: UserRow) => {
    // Move user from assigned to unassigned list
    setAssignedUsers((prevAssignedUsers) =>
      prevAssignedUsers.filter((u) => u !== user)
    );
    setUnassignedUsers((prevUnassignedUsers) => [...prevUnassignedUsers, user]);
  };

  const assign = (user: UserRow) => {
    // Move user from assigned to unassigned list
    setUnassignedUsers((prevUnassignedUsers) =>
      prevUnassignedUsers.filter((u) => u !== user)
    );
    setAssignedUsers((prevAssignedUsers) => [...prevAssignedUsers, user]);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {playlist.title}
      <h2 className='bg-green-300 p-2 text-green-900 rounded-lg'>
        User Count: {assignedUsers.length}
      </h2>
      {isOpen && (
        <>
          {assignedUsers.map((user) => (
            <AssignedUserCard
              user={user}
              playlist_id={playlist.id}
              key={user.id + playlist.id}
              unassign={unassign}
            />
          ))}
          {unassignedUsers.map((user) => (
            <UnassignedUserCard
              user={user}
              playlist_id={playlist.id}
              key={user.id + playlist.id}
              assign={assign}
            />
          ))}
        </>
      )}
      <ExpandButton
        open={isOpen}
        toggle={handleClick}
      />
    </div>
  );
};

export default PlaylistUserCard;
