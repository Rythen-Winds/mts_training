import { getUnwatchedUserVideos, getUser } from '../../DB/supabase';

export async function VideoLoader() {
  try {
    const { id } = await getUser();

    if (!id) {
      return { videos: [] };
    }

    const videos = await getUnwatchedUserVideos(id);

    return {
      videos,
    };
  } catch (error) {
    console.error('Error loading data:', error);
    // Handle the error or return a default value if needed
    return {
      videos: [],
    };
  }
}
