import { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import { addVideoToPlaylist } from '../DB/supabase';
import { PlaylistRow, VideoRows } from '../DB/types';
import UseMasterList from '../hooks/useMasterList';
import ExpandButton from './ExpandButton';

const AddVideoCard = ({ playlist }: { playlist: PlaylistRow }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [filteredVideos, setFilteredVideos] = useState<VideoRows>([]);
  const [selectedVideo, setSelectedVideo] = useState<number>();
  const existing_ids = playlist.video_ids;
  const { videoList } = UseMasterList();

  useEffect(() => {
    if (!videoList) return;

    const filteredVideos = videoList.filter((video) => {
      return !existing_ids.includes(video.id);
    });
    setFilteredVideos(filteredVideos);
  }, [videoList, playlist]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission

    // Ensure a video is selected before attempting to add
    if (selectedVideo) {
      addVideoToPlaylist(playlist.id, selectedVideo);

      setFormOpen(false);
      setSelectedVideo(undefined);
    }
  };

  return (
    <>
      <div className='bg-background bg-opacity-80 p-4 rounded-lg flex justify-between'>
        {!formOpen && <span> Add Video to Playlist</span>}
        {formOpen && filteredVideos && (
          <Form
            onSubmit={handleFormSubmit}
            className='flex flex-row gap-4'
          >
            <select
              className='rounded-lg px-4'
              value={selectedVideo}
              onChange={(e) => setSelectedVideo(Number(e.target.value))}
            >
              <option value=''>Select a video</option>
              {filteredVideos.map((vid) => (
                <option
                  key={vid.id}
                  value={vid.id}
                >
                  {vid.video_name}
                </option>
              ))}
            </select>
            <button type='submit'>Add Video</button>
          </Form>
        )}
        <ExpandButton
          open={formOpen}
          toggle={() => setFormOpen(!formOpen)}
        />
      </div>
    </>
  );
};

export default AddVideoCard;
