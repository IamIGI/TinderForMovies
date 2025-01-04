import KeyboardControlsLegend from '../../components/KeyboardControlsLegend/KeyboardControlsLegend';
import SwipeCards from '../../components/SwipeCards/SwipeCards';
import c from './Home.module.scss';
import { useMoviesContext } from '../../context/MoviesContext';

const Home = () => {
  const { movies } = useMoviesContext();

  return (
    <div className={c.wrapper}>
      <div className={c.content}>
        <SwipeCards moviesData={movies} />
      </div>
      <KeyboardControlsLegend />
    </div>
  );
};

export default Home;
