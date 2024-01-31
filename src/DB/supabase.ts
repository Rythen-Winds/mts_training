import { createClient } from '@supabase/supabase-js';
import { Database } from '../../database.types';
import { UserRows, VideoRows } from './types';

export const supabase = createClient<Database>(
  'https://jvrdzstjuggndyelwytk.supabase.co',
  /* cspell: disable-next-line */
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2cmR6c3RqdWdnbmR5ZWx3eXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2ODUyNDIsImV4cCI6MjAyMTI2MTI0Mn0.32_SOw9TAq807ArZeQGFRQzu3wsWra5jAT-lHuAGHCU'
);

//* Authentication

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<boolean> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return !!data;
  } catch (error) {
    // Handle the error if needed
    console.error('Login error:', error);
    throw error; // You might want to throw the error again or handle it accordingly
  }
}

export async function logout() {
  await supabase.auth.signOut();
}

export async function isUserAdmin(user_id: string) {
  // Using Supabase client to query the 'user_roles' table
  const { data, error } = await supabase
    .from('user_data')
    .select('role')
    .eq('id', user_id);

  // Checking for errors in the query
  if (error) {
    console.error('Supabase error:', error.message);
    return false; // Assuming an error means the user is not an admin
  }

  // Checking if data is available and the user has an 'admin' role
  if (data[0] && data[0].role === 'admin') {
    return true;
  }

  return false; // Default to false if data is not available or the role is not 'admin'
}

//* Playlists

export async function getAllPlaylists() {
  const { data, error } = await supabase.from('playlists').select('*');
  if (error) throw error;
  return data;
}

export async function addVideoToPlaylist(
  playlist_id: number,
  video_id: number
) {
  try {
    // Fetch the current video_ids array for the playlist
    const { data, error } = await supabase
      .from('playlists')
      .select('video_ids')
      .eq('id', playlist_id);

    if (error) {
      throw error;
    }

    const currentVideoIds = data && data[0]?.video_ids ? data[0].video_ids : [];

    // Check if video_id is not already in the array
    if (!currentVideoIds.includes(video_id)) {
      // Update the playlist with the new video_ids array
      const updatedVideoIds = [...currentVideoIds, video_id];

      const { error: updateError } = await supabase
        .from('playlists')
        .update({ video_ids: updatedVideoIds })
        .eq('id', playlist_id);

      if (updateError) {
        throw updateError;
      }
    } else {
      // Video_id is already in the array, handle it accordingly (e.g., show a message)
      console.log('Video is already in the playlist');
    }
  } catch (error) {
    console.error('Error adding video to playlist:', error);
    // Handle the error as needed
  }
}

export async function removeVideoFromPlaylist(
  playlist_id: number,
  video_id: number
) {
  try {
    // Fetch the current video_ids array for the playlist
    const { data, error } = await supabase
      .from('playlists')
      .select('video_ids')
      .eq('id', playlist_id);

    if (error) {
      throw error;
    }

    const currentVideoIds = data && data[0]?.video_ids ? data[0].video_ids : [];

    // Check if video_id is in the array
    if (currentVideoIds.includes(video_id)) {
      // Create a new array without the specified video_id
      const updatedVideoIds = currentVideoIds.filter((id) => id !== video_id);

      // Update the playlist with the new video_ids array
      const { error: updateError } = await supabase
        .from('playlists')
        .update({ video_ids: updatedVideoIds })
        .eq('id', playlist_id);

      if (updateError) {
        throw updateError;
      }
    } else {
      // Video_id is not in the array, handle it accordingly (e.g., show a message)
      console.log('Video is not in the playlist');
    }
  } catch (error) {
    console.error('Error removing video from playlist:', error);
    // Handle the error as needed
  }
}

export async function getUserPlaylists() {
  try {
    const { data, error } = await supabase
      .from('user_playlists')
      .select('playlist_id');

    if (error) {
      throw new Error(`Error fetching user playlists: ${error.message}`);
    }

    return data?.map((item) => item.playlist_id!) || [];
  } catch (error) {
    console.error('Error in getUserPlaylists:', error);
    throw error; // Rethrow the error for the calling code to handle if needed
  }
}

//* Videos

export async function getUnwatchedUserVideos(user_id: string) {
  try {
    const { data, error } = await supabase
      .from('user_data')
      .select('playlists, watched_videos')
      .eq('id', user_id);

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      const playlists = data[0].playlists;
      const prevWatched = data[0].watched_videos;

      // Fetch videos for each playlist and flatten the result
      const allVideos = await Promise.all(
        playlists.map(async (playlistId) => {
          const { data: playlistVideos, error: playlistError } = await supabase
            .from('playlists')
            .select('video_ids')
            .eq('id', playlistId);

          if (playlistError) {
            throw playlistError;
          }

          return playlistVideos?.[0]?.video_ids || [];
        })
      );

      // Flatten the array of arrays into a single array of video IDs
      const allVideoIds = allVideos.flat();

      // Filter out watched videos
      const unwatchedVideos = allVideoIds.filter(
        (videoId) => !prevWatched.includes(videoId)
      );

      // Fetch additional information for each unwatched video
      const videoData = await Promise.all(
        unwatchedVideos.map(async (id) => {
          const { data: videoInfo, error: videoError } = await supabase
            .from('MasterVideoList')
            .select('*')
            .eq('id', id);

          if (videoError) {
            throw videoError;
          }

          return videoInfo?.[0];
        })
      );

      return videoData;
    }
  } catch (error) {
    console.error('Error fetching unwatched user videos:', error);
    // Handle the error as needed
  }
}

export async function getVideos(filter?: string): Promise<VideoRows> {
  let query = supabase.from('MasterVideoList').select('*');

  if (filter !== undefined && filter.trim() !== '') {
    /* cspell: disable-next-line */
    query = query.ilike('name', `%${filter}%`);
  }

  try {
    const { data, error } = await query;

    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    throw error;
  }
}

export async function getVideoByID(id: number) {
  const { data, error } = await supabase
    .from('MasterVideoList')
    .select('*')
    .eq('id', id);
  if (error) {
    throw error;
  } else return data[0];
}

export async function getAllUsers() {
  const { data, error } = await supabase.from('user_data').select('*');
  if (error) {
    throw error;
  }
  return data as UserRows;
}

export async function addPlayListToUser(user_id: string, newPlaylist: number) {
  // Fetch the current playlists of the user
  const { data: oldList, error: fetchError } = await supabase
    .from('user_data')
    .select('playlists')
    .eq('id', user_id);

  if (fetchError) {
    throw fetchError;
  }

  // If oldList is undefined or null, set it as an empty array
  const existingPlaylists = oldList[0].playlists || [];

  // Check if the new playlist already exists in the user's playlists
  if (!existingPlaylists.includes(newPlaylist)) {
    // Add the new playlist to the existing playlists
    existingPlaylists.push(newPlaylist);

    // Update the user's playlists in the database
    const { data: updatedData, error: updateError } = await supabase
      .from('user_data')
      .update({ playlists: existingPlaylists })
      .eq('id', user_id)
      .select();

    if (updateError) {
      throw updateError;
    }

    return updatedData;
  }

  // If the new playlist already exists, you may want to handle this case accordingly.
  // For now, let's return the existing playlists.
  return existingPlaylists;
}

export async function removePlaylistFromUser(
  user_id: string,
  playlistToRemove: number
) {
  // Fetch the current playlists of the user
  const { data: oldList, error: fetchError } = await supabase
    .from('user_data')
    .select('playlists')
    .eq('id', user_id);

  if (fetchError) {
    throw fetchError;
  }

  // If oldList is undefined or null, set it as an empty array
  const existingPlaylists = oldList[0].playlists || [];

  // Check if the playlistToRemove exists in the user's playlists
  const playlistIndex = existingPlaylists.indexOf(playlistToRemove);
  if (playlistIndex !== -1) {
    // Remove the playlist from the existing playlists
    existingPlaylists.splice(playlistIndex, 1);

    // Update the user's playlists in the database
    const { data: updatedData, error: updateError } = await supabase
      .from('user_data')
      .update({ playlists: existingPlaylists })
      .eq('id', user_id)
      .select();

    if (updateError) {
      throw updateError;
    }

    return updatedData;
  }

  // If the playlistToRemove doesn't exist, you may want to handle this case accordingly.
  // For now, let's return the existing playlists.
  return existingPlaylists;
}

export async function getUserById(user_id: string) {
  const { data, error } = await supabase
    .from('user_data')
    .select('userName')
    .eq('id', user_id);
  if (error) throw error;
  return data[0];
}

export async function setVideoWatched(video_id: number, user_id: string) {
  try {
    // Fetch the current watched videos array for the user
    const { data, error } = await supabase
      .from('user_data')
      .select('watched_videos')
      .eq('id', user_id);

    if (error) {
      throw error;
    }

    // Extract the current watched videos array or create an empty array if it doesn't exist
    const currentWatchedVideos =
      data && data[0]?.watched_videos ? data[0].watched_videos : [];

    // Check if the video_id is not already in the array
    if (!currentWatchedVideos.includes(video_id)) {
      // Add the video_id to the array
      const updatedWatchedVideos = [...currentWatchedVideos, video_id];

      // Update the user_data with the new watched_videos array
      const { error: updateError } = await supabase
        .from('user_data')
        .update({ watched_videos: updatedWatchedVideos })
        .eq('id', user_id);

      if (updateError) {
        throw updateError;
      }
    }
  } catch (error) {
    console.error('Error setting video as watched:', error);
    // Handle the error as needed
  }
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }
  return data.session;
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw error;
  }
  return data.user;
}

supabase.auth.onAuthStateChange((event, session) => {
  if (event == 'USER_UPDATED') {
    console.log('USER_UPDATED', session);
  } else console.log(event);
  getSession();
});
