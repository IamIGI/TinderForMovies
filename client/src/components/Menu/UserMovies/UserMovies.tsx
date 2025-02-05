import { Movie } from '../../../interfaces/movie.interface.';
import Loading from '../../Loading/Loading';
import c from './UserMovies.module.scss';
import { motion } from 'motion/react';

interface UserMoviesProps {
  likedMovies: Movie[];
  dislikedMovies: Movie[];
  handleSelectedMovie: (movie: Movie) => void;
  isDataFetching: boolean;
}
interface MovieListProps {
  movies: Movie[];
  handleSelectedMovie: (movie: Movie) => void;
}

const UserMovies: React.FC<UserMoviesProps> = ({
  likedMovies,
  dislikedMovies,
  handleSelectedMovie,
  isDataFetching,
}) => {
  return (
    <div className={c.wrapper}>
      {isDataFetching ? (
        <div className={c.loadingWrapper}>
          <Loading />
        </div>
      ) : (
        <>
          <div className={c.content}>
            <h2>Liked</h2>
            <MovieList
              movies={likedMovies}
              handleSelectedMovie={handleSelectedMovie}
            />
          </div>
          <div className={c.content}>
            <h2>Disliked</h2>
            <MovieList
              movies={dislikedMovies}
              handleSelectedMovie={handleSelectedMovie}
            />
          </div>
        </>
      )}
    </div>
  );
};

const MovieList: React.FC<MovieListProps> = ({
  movies,
  handleSelectedMovie,
}) => {
  return (
    <div className={c.movieList}>
      {movies.map((movie) => (
        <motion.button
          className="hover-effect"
          key={movie.id}
          initial={{ scale: 1.4, opacity: 0 }}
          animate={{ scale: 1.0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => handleSelectedMovie(movie)}
        >
          <img
            src={movie.imageUrl.replace(
              '@._V1_.jpg',
              '@._V1_QL75_UX140_CR0,1,140,207_.jpg'
            )}
            alt={movie.title}
            loading="lazy"
          />
        </motion.button>
      ))}
    </div>
  );
};

export default UserMovies;
