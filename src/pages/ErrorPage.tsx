import { useRouteError } from 'react-router-dom';
import FlexWrapper from '../components/FlexWrapper';

function isErrStatus(err: any): err is { statusText: string } {
  return !!err && 'statusText' in err;
}

function isErrMessage(err: any): err is { message: string } {
  return !!err && 'message' in err;
}
function isErrStack(err: any): err is { stack: string } {
  return !!err && 'stack' in err;
}

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <FlexWrapper>
      <div
        id='error-page'
        className='flex flex-col  p-4 bg-secondary border-accent border-4 rounded-3xl  m-auto justify-center items-center gap-4'
      >
        <h1 className='text-3xl'>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <div className='w-min flex flex-col gap-4'>
          <p className=' text-red-500 bg-background border-accent border-2 font-bold  p-4 rounded-2xl text-center'>
            {(isErrStatus(error) && error.statusText) ||
              (isErrMessage(error) && error.message)}
          </p>
          {isErrStack(error) && (
            <div className='max-h-64 overflow-scroll border-accent border-2 p-4 rounded-3xl '>
              {error.stack}
            </div>
          )}
        </div>
      </div>
    </FlexWrapper>
  );
}
