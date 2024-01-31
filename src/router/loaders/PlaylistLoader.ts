import { getAllPlaylists, getAllUsers } from '../../DB/supabase';

export async function PlaylistLoader() {
  const playlists = await getAllPlaylists();
  const users = await getAllUsers();
  return { playlists, users };
}
