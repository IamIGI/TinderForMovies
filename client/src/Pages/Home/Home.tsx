import KeyboardControlsLegend from '../../components/KeyboardControlsLegend/KeyboardControlsLegend';
import SwipeCards from '../../components/SwipeCards/SwipeCards';
import c from './Home.module.scss';
import { useMoviesContext } from '../../context/MoviesContext';
import SideMenu from '../../components/SideMenu/SideMenu';

const Home = () => {
  const { movies } = useMoviesContext();

  return (
    <div className={c.wrapper}>
      <SideMenu isVisible={false} onCloseCart={() => {}} />
      <div className={c.content}>
        <SwipeCards moviesData={movies} />
        <KeyboardControlsLegend />
      </div>
    </div>
  );
};

export default Home;
