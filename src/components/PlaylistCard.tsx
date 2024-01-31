import { useEffect, useState } from 'react';
import { Database } from '../../database.types';
import { getVideoByID, removeVideoFromPlaylist } from '../DB/supabase';
import { VideoRows } from '../DB/types';
import AddVideoCard from './AddVideoCard';
import ExpandButton from './ExpandButton';
import PlaylistVideoCard from './PlaylistVideoCard';

const PlaylistCard = ({
  playlist,
}: {
  playlist: Database['public']['Tables']['playlists']['Row'];
}) => {
  const { video_ids } = playlist;
  const [isOpen, setIsOpen] = useState(false);
  const [videos, setVideos] = useState<VideoRows>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let videoAccumulator: VideoRows = [];
        for (const id of video_ids) {
          const video = await getVideoByID(id);
          videoAccumulator.push(video);
        }
        setVideos(videoAccumulator);
      } catch (error) {
        console.error('Error fetching videos:', error);
        // Handle the error, e.g., show a user-friendly message or log it
      }
    };

    fetchVideos();
  }, [video_ids]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = (video_id: number) => {
    removeVideoFromPlaylist(playlist.id, video_id);
  };

  return (
    <div className=''>
      <div className='px-8 py-4 bg-background rounded-2xl flex justify-between items-center flex-row'>
        <h1 className='text-lg w-80 overflow-hidden overflow-ellipsis'>
          {playlist.title}
        </h1>
        <h2 className='bg-green-300 p-2 text-green-900 rounded-lg'>
          Video Count: {playlist.video_ids.length}
        </h2>
        <ExpandButton
          open={isOpen}
          toggle={handleClick}
        />
      </div>
      {isOpen && (
        <div className='flex flex-col gap-1 py-1 px-4'>
          {videos.map((video) => (
            <PlaylistVideoCard
              handleDelete={() => handleDelete(video.id)}
              video={video}
              key={video.id}
            />
          ))}
          <AddVideoCard playlist={playlist} />
        </div>
      )}
    </div>
  );
};

export default PlaylistCard;
