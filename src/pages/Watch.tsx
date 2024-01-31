import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  getUnwatchedUserVideos,
  getUser,
  setVideoWatched,
} from '../DB/supabase';
import { VideoRows } from '../DB/types';
import VideoCard from '../components/VideoCard';

const Watch = () => {
  const [user, setUser] = useState<User | null>(null);
  const { videos } = useLoaderData() as { videos: VideoRows };

  const [unwatched, setUnwatched] = useState<VideoRows>(videos);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
        // Handle the error, e.g., show a user-friendly message or redirect
      }
    };

    fetchUser();
  }, []); // Dependency array is empty, runs once on mount

  useEffect(() => {
    const fetchDetails = async () => {
      if (!user) return;
      try {
        const userDetails = await getUnwatchedUserVideos(user.id);
        if (userDetails) setUnwatched(userDetails);
      } catch (error) {
        throw error;
      }
    };
    fetchDetails;
  }, [user]);

  if (!user) {
    // Loading state
    return <div>Loading...</div>;
  }
  const handleWatch = (video_id: number) => {
    const isReadyToMark = window.confirm(
      "Ready to mark this video complete?\n The developer hasn't added the ability to rewatch videos yet"
    );

    if (isReadyToMark) {
      setVideoWatched(video_id, user.id);
      setUnwatched((prev) => prev.filter((vid) => vid.id !== video_id));
    }
  };

  return (
    <div>
      {unwatched.length === 0 ? (
        <p>You're all caught up! No more unwatched training videos.</p>
      ) : (
        <div className='flex flex-wrap justify-evenly gap-2 bg-primary'>
          {unwatched.map((video) => (
            <VideoCard
              markAsWatched={() => handleWatch(video.id)}
              videoId={video.id}
              key={video.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Watch;
