import { ReactNode } from 'react';

interface FlexWrapperProps {
  children: ReactNode;
}

const FlexWrapper = ({ children }: FlexWrapperProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      {children}
    </div>
  );
};

export default FlexWrapper;
