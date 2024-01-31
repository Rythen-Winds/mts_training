import { useEffect, useState } from 'react';
import { getVideos } from '../DB/supabase';
import { VideoRows } from '../DB/types';

const UseMasterList = () => {
  const [videoList, setVideoList] = useState<VideoRows>([]);

  useEffect(() => {
    const fetchMasterVideos = async () => {
      try {
        const data = await getVideos();
        setVideoList(data);
      } catch (error) {
        console.error('Error fetching master video list:', error);
      }
    };

    fetchMasterVideos();
  }, []);

  return { videoList };
};
export default UseMasterList;
