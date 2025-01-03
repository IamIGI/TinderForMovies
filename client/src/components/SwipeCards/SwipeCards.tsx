import { Movie } from '../../interfaces/movie.interface.';
import Card from '../Card/Card';
import c from './SwipeCards.module.scss';

interface SwipeCardsProps {
  movies: Movie[];
}
const SwipeCards: React.FC<SwipeCardsProps> = ({ movies }) => {
  return (
    <div
      className={c.wrapper}
      // style={{ backgroundImage: `url(${movies[0].imageUrl})` }}
    >
      <Card key={movies[0].id} {...movies[0]} />;
      {/* {movies.map((movie) => {
        return <Card key={movie.id} {...movie} />;
      })} */}
    </div>
  );
};

export default SwipeCards;
