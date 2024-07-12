import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { ROUTER_PATHS } from '@/constants';
import { useAuthStore } from '@/store';

import { Layout } from '../Layout';
import { AuthPage } from '../AuthPage';
import { MainPage } from '../MainPage';

const createRouter = (isAuth: boolean) =>
  createBrowserRouter(
    createRoutesFromElements(
      !isAuth ? (
        <Route path={ROUTER_PATHS.main} element={<AuthPage />} />
      ) : (
        <Route element={<Layout />}>
          <Route path={ROUTER_PATHS.main} element={<MainPage />} />
        </Route>
      ),
    ),
  );

const Router = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return <RouterProvider router={createRouter(isAuth)} />;
};

export { Router };
