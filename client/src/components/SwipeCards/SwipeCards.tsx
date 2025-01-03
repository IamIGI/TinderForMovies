import { useState } from 'react';
import { Movie } from '../../interfaces/movie.interface.';
import Card from '../Card/Card';
import c from './SwipeCards.module.scss';

interface SwipeCardsProps {
  moviesData: Movie[];
}
const SwipeCards: React.FC<SwipeCardsProps> = ({ moviesData }) => {
  const [movies, setMovies] = useState<Movie[]>(moviesData);

  return (
    <div
      className={c.wrapper}
      // style={{ backgroundImage: `url(${movies[0].imageUrl})` }}
    >
      {movies.map((movie) => {
        return <Card key={movie.id} {...movie} setMovies={setMovies} />;
      })}
    </div>
  );
};

export default SwipeCards;
