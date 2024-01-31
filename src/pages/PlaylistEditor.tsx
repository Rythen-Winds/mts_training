import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getAllPlaylists, supabase } from '../DB/supabase';
import { PlaylistRows } from '../DB/types';
import CreatePlaylistCard from '../components/CreatePlaylistCard';
import PlaylistCard from '../components/PlaylistCard';

const PlaylistEditor = () => {
  const { playlists } = useLoaderData() as {
    playlists: PlaylistRows;
  };

  const [playlistData, setPlaylistData] = useState<PlaylistRows>(playlists);

  useEffect(() => {
    const channel = supabase
      .channel('playlists')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'playlists' },
        async () => {
          try {
            const data = await getAllPlaylists();
            setPlaylistData(data);
          } catch (error) {
            console.error(error);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className='p-4 bg-primary flex flex-col gap-2'>
      {playlistData &&
        playlistData.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
          />
        ))}
      <CreatePlaylistCard />
    </div>
  );
};

export default PlaylistEditor;
