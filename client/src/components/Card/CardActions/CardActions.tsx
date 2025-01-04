import { useMoviesContext } from '../../../context/MoviesContext';
import { Movie } from '../../../interfaces/movie.interface.';
import c from './CardActions.module.scss';

interface CardActionsProps {
  movie: Movie;
}

const CardActions: React.FC<CardActionsProps> = ({ movie }) => {
  const { setMovieStatus } = useMoviesContext();

  return (
    <div className={c.wrapper}>
      <button onClick={() => setMovieStatus(movie, true)}>
        <img className="white-svg-icon" src="svg/card/love.svg" alt="love" />
      </button>
      {/* Just mock button */}
      <button>
        <img
          className="white-svg-icon"
          src="svg/card/playPause.svg"
          alt="love"
        />
      </button>
      <button onClick={() => setMovieStatus(movie, false)}>
        <img
          className="white-svg-icon"
          src="svg/card/cancel2.svg"
          alt="cancel"
        />
      </button>
    </div>
  );
};

export default CardActions;
