import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Account from '../pages/Account';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import PlaylistAssigner from '../pages/PlaylistAssigner';
import PlaylistEditor from '../pages/PlaylistEditor';
import PlaylistPage from '../pages/PlaylistPage';
import Reports from '../pages/Reports';
import Watch from '../pages/Watch';
import PrivateOutlet from './PrivateOutlet';
import { PlaylistLoader } from './loaders/PlaylistLoader';
import { ReportLoader } from './loaders/ReportLoader';
import { VideoLoader } from './loaders/VideoLoader';
import ChangePassword from '../pages/ChangePassword';

const Router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <HomePage />, errorElement: <ErrorPage /> },
        {
          path: '/',
          element: <PrivateOutlet />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: '/watch',
              loader: VideoLoader,
              element: <Watch />,
            },
            {
              path: '/reports',
              loader: ReportLoader,
              element: <Reports />,
            },
            {
              path: '/account',
              element: <Account />,
            },
            {
              path: '/playlists',
              element: <PlaylistPage />,
            },
            {
              path: '/playlists/edit',
              element: <PlaylistEditor />,
              loader: PlaylistLoader,
              errorElement: <ErrorPage />,
            },
            {
              path: '/playlists/assign',
              element: <PlaylistAssigner />,
              loader: PlaylistLoader,

              errorElement: <ErrorPage />,
            },
            {
              path: '/account/changePassword',
              element: <ChangePassword />,

              errorElement: <ErrorPage />,
            },
          ],
        },
      ],
    },
  ],
  { basename: '/mts_training/' }
);
export default Router;
