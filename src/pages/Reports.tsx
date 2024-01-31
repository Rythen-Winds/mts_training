import { useLoaderData } from 'react-router-dom';
import { VideoRows } from '../DB/types';

interface ReportData {
  videos:VideoRows; // Replace YourVideoType with the actual type of videos
}

const Reports = () => {
  const { videos } = useLoaderData() as ReportData;

  return (
    <div>
      <h2>Reports</h2>
    </div>
  );
};

export default Reports;
