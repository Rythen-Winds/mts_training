import { getVideos } from '../../DB/supabase';

export async function ReportLoader() {
  try {
    const videos = await getVideos();

    return {
      videos: videos,
    };
  } catch (error) {
    console.error('Error loading data:', error);
    // Handle the error or return a default value if needed
    return {
      videos: [],
    };
  }
}
