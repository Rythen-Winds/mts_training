import { Database } from '../../database.types';

export type PlaylistRow = Database['public']['Tables']['playlists']['Row'];
export type UserRow = Database['public']['Tables']['user_data']['Row'];
export type VideoRow = Database['public']['Tables']['MasterVideoList']['Row'];
export type PlaylistRows = PlaylistRow[];
export type UserRows = UserRow[];
export type VideoRows = VideoRow[];
