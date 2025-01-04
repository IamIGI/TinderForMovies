import { Movie } from '../interfaces/movie.interface.';
import { useContext, createContext, useState } from 'react';
import { tinderMovies } from '../mocks/movies';

// Define the shape of the context
export interface MoviesContextInterface {
  movies: Movie[];
  likedMovies: Movie[];
  dislikedMovies: Movie[];
  setMovieStatus: (movie: Movie, isMovieLiked: boolean) => void;
  //   fetchMovies: (movies: Movie[]) => void;
}

const MoviesContext = createContext<MoviesContextInterface | undefined>(
  undefined
);

export const MovieContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [movies, setMovies] = useState<Movie[]>(tinderMovies);
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
  const [dislikedMovies, setDislikedMovies] = useState<Movie[]>([]);

  const setMovieStatus = (movie: Movie, isMovieLiked: boolean) => {
    setMovies((prevMovies) => prevMovies.filter((m) => m.id !== movie.id));

    if (isMovieLiked) {
      setLikedMovies((prev) => [...prev, movie]);
    } else {
      setDislikedMovies((prev) => [...prev, movie]);
    }
  };

  return (
    <MoviesContext.Provider
      value={{ movies, likedMovies, dislikedMovies, setMovieStatus }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMoviesContext = (): MoviesContextInterface => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMoviesContext must be used within a MoviesProvider');
  }
  return context;
};
