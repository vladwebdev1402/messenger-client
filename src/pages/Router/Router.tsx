import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { ROUTER_PATHS } from '@/constants';

import { Layout } from '../Layout';
import { AuthPage } from '../AuthPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path={ROUTER_PATHS.main} element={<AuthPage />} />
    </Route>,
  ),
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export { Router };
