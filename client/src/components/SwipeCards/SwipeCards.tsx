import { Movie } from '../../interfaces/movie.interface.';
import Card from '../Card/Card';
import c from './SwipeCards.module.scss';

interface SwipeCardsProps {
  moviesData: Movie[];
}
const SwipeCards: React.FC<SwipeCardsProps> = ({ moviesData }) => {
  return (
    <div
      className={c.wrapper}
      // style={{ backgroundImage: `url(${movies[0].imageUrl})` }}
    >
      {moviesData.map((movie) => {
        return <Card key={movie.id} {...movie} />;
      })}
    </div>
  );
};

export default SwipeCards;
