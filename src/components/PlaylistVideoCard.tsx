import { VideoRow } from '../DB/types';

const PlaylistVideoCard = ({
  video,
  handleDelete,
}: {
  video: VideoRow;
  handleDelete: () => void;
}) => {
  return (
    <div className='flex flex-row justify-between p-4  rounded-lg bg-background '>
      <span>{video.video_name}</span>
      <button onClick={handleDelete}>X</button>
    </div>
  );
};

export default PlaylistVideoCard;
