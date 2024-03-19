import { Strength } from '../utils/types';

const PasswordStrengthIndicator = ({ strength }: { strength: Strength }) => {
  let indicatorClass = '';
  let barWidth = '';

  switch (strength) {
    case 'Empty':
      indicatorClass = 'bg-gray-300';
      barWidth = '10%';
      break;
    case 'Weak':
      indicatorClass = 'bg-red-500';
      barWidth = '33%';
      break;
    case 'Medium':
      indicatorClass = 'bg-yellow-500';
      barWidth = '67%';
      break;
    case 'Strong':
      indicatorClass = 'bg-green-500';
      barWidth = '100%';
      break;
    default:
      break;
  }

  return (
    <div className='flex items-center'>
      {/* Parent container */}
      <div className='w-32 h-4 bg-gray-200 rounded-full relative'>
        {/* Strength bar */}
        <div
          className={`h-full rounded-full absolute top-0 left-0 ${indicatorClass}`}
          style={{ width: barWidth }}
        />
      </div>
      {/* Strength text */}
      <div className='ml-2'>{strength}</div>
    </div>
  );
};

export default PasswordStrengthIndicator;
