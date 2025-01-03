import KeyboardControlsLegend from '../../components/KeyboardControlsLegend/KeyboardControlsLegend';
import SwipeCards from '../../components/SwipeCards/SwipeCards';
import { tinderMovies } from '../../mocks/movies';
import c from './Home.module.scss';

const Home = () => {
  return (
    <div className={c.wrapper}>
      <div className={c.content}>
        <SwipeCards moviesData={tinderMovies} />
      </div>
      <KeyboardControlsLegend />
    </div>
  );
};

export default Home;
