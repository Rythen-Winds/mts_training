import { useEffect, useState } from 'react';
import { getUser, getVideoByID, setVideoWatched } from '../DB/supabase';

const VideoCard = ({
  videoId,
  markAsWatched,
}: {
  videoId: number;
  markAsWatched: (videoId: number) => void;
}) => {
  const [video, setVideo] = useState<{
    video_url: string;
    video_name: string;
  } | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { video_url, video_name } = await getVideoByID(videoId);
        setVideo({ video_url, video_name });
      } catch (error) {
        console.error('Error fetching video:', error);
        // Handle error, maybe set an error state
      }
    };

    fetchVideo();
  }, [videoId]);

  const handleClick = async (videoId: number) => {
    try {
      const user = await getUser();
      if (!user) {
        throw new Error('No user found');
      }
      const { id } = user;

      // Add await before setVideoWatched if it returns a Promise
      await setVideoWatched(videoId, id);

      markAsWatched(videoId);
    } catch (error) {
      console.error('Error setting video as watched:', error);
      // Handle error, maybe set an error state
    }
  };

  return (
    <div className='flex flex-col p-2 gap-4 rounded-md bg-primary'>
      <>
        {video ? (
          <iframe
            className='bg-secondary'
            src={video.video_url}
            width={480} // Replace with actual value
            height={360} // Replace with actual value
            allowFullScreen
          ></iframe>
        ) : (
          <span className='w-[480px] h-[360px] bg-secondary'></span>
        )}
        <button
          className='bg-gradient-to-br from-primary via-secondary to-primary m-auto border-black hover:via-slate-700  hover:border-white border-2 text-2xl text-white rounded-lg p-4 text-nowrap'
          onClick={() => handleClick(videoId)}
        >
          Mark as Watched
        </button>
      </>
    </div>
  );
};

export default VideoCard;
