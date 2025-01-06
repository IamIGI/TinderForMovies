import { Route, Routes } from 'react-router-dom';
import Welcome from '../pages/Welcome/Welcome';
import Home from '../pages/Home/Home';

export enum NavigationLinks {
  Welcome = '/welcome',
  Home = '/',
}

const Root = () => {
  return (
    <Routes>
      <Route path={NavigationLinks.Welcome} element={<Welcome />} />
      <Route path={NavigationLinks.Home} element={<Home />} />
    </Routes>
  );
};

export default Root;
