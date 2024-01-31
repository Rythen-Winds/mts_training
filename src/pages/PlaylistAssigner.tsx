import { useLoaderData } from 'react-router-dom';
import { PlaylistRows } from '../DB/types';
import PlaylistUserCard from '../components/PlaylistUserCard';

const PlaylistAssigner = () => {
  const { playlists } = useLoaderData() as { playlists: PlaylistRows };
  return (
    <div>
      {playlists.map((playlist) => {
        return (
          <PlaylistUserCard
            playlist={playlist}
            key={playlist.id}
          />
        );
      })}
    </div>
  );
};

export default PlaylistAssigner;
