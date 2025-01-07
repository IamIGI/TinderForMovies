import moviesApi from '../api/movies.api';
import {
  FetchMovieRequest,
  Movie,
  MovieStatus,
  UserMovieDataResponse,
} from '../interfaces/movie.interface.';
import { useContext, createContext, useState, useEffect } from 'react';

export interface MoviesContextInterface {
  movies: { isLoading: boolean; isError: boolean; data: Movie[] };
  userMovies: {
    isLoading: boolean;
    isError: boolean;
    data: UserMovieDataResponse;
  };
  setMovieStatus: (movie: Movie, isMovieLiked: boolean) => Promise<void>;
  resetApp: () => void;
}
//exports required for tests
export const MoviesContext = createContext<MoviesContextInterface | undefined>(
  undefined
);

export const MovieContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const MOVIES_FETCH_AMOUNT = 6;
  const MOVIES_LEFT_BEFORE_REFETCH = 3;
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [userMoviesData, setUserMoviesData] = useState<UserMovieDataResponse>({
    liked: [],
    disliked: [],
  });

  const [isMoviesLoading, setIsMoviesLoading] = useState<boolean>(false);
  const [isUserMoviesLoading, setIsUserMoviesLoading] =
    useState<boolean>(false);
  const [isMoviesError, setIsMoviesError] = useState<boolean>(false);
  const [isUserMoviesError, setIsUserMoviesError] = useState<boolean>(false);

  //Init
  const loadMoviesAndUserMovies = async () => {
    setIsMoviesLoading(true);
    setIsUserMoviesLoading(true);
    setIsMoviesError(false);
    setIsUserMoviesError(false);

    try {
      // Fetch movies
      const movieData = await moviesApi.fetchMovies({
        amount: MOVIES_FETCH_AMOUNT,
      });
      if (movieData === undefined) {
        setIsMoviesError(true);
      } else {
        setMoviesData(movieData.movies);
      }

      // Fetch user movies
      const userMovieData = await moviesApi.fetchUserMovies();
      if (userMovieData === undefined) {
        setIsUserMoviesError(true);
      } else {
        setUserMoviesData(userMovieData);
      }
    } catch (error) {
      console.error('Error loading movies or user movies:', error);
      setIsMoviesError(true);
      setIsUserMoviesError(true);
    } finally {
      setIsMoviesLoading(false);
      setIsUserMoviesLoading(false);
    }
  };

  useEffect(() => {
    loadMoviesAndUserMovies();
  }, []);

  const setMovieStatus = async (movie: Movie, isMovieLiked: boolean) => {
    const updatedMoviesDataArray = moviesData.filter((m) => m.id !== movie.id);
    setMoviesData(updatedMoviesDataArray);

    const updatedUserMovies = { ...userMoviesData };
    if (isMovieLiked) {
      updatedUserMovies.liked = [...updatedUserMovies.liked, movie];
    } else {
      updatedUserMovies.disliked = [...updatedUserMovies.disliked, movie];
    }
    setUserMoviesData(updatedUserMovies);

    // Update movie status on the server
    await moviesApi
      .updateMovieStatus({
        id: movie.id,
        status: isMovieLiked ? MovieStatus.Liked : MovieStatus.DisLiked,
      })
      .catch((error) => {
        console.error('Failed to update movie status:', error);
      });

    if (updatedMoviesDataArray.length === MOVIES_LEFT_BEFORE_REFETCH) {
      await refetchMovies({
        space: MOVIES_LEFT_BEFORE_REFETCH,
        amount: MOVIES_FETCH_AMOUNT,
      });
    }
  };

  const refetchMovies = async (payload: FetchMovieRequest) => {
    setIsMoviesError(false);

    try {
      const movieData = await moviesApi.fetchMovies(payload);
      if (movieData === undefined) {
        setIsMoviesError(true);
      } else {
        setMoviesData((prev) => {
          return [...movieData.movies, ...prev];
        });
      }
    } catch (error) {
      console.error('Failed to refetch movies:', error);
      setIsMoviesError(true);
    }
  };

  const resetApp = async () => {
    await moviesApi.resetMovies();
    loadMoviesAndUserMovies();
  };

  return (
    <MoviesContext.Provider
      value={{
        movies: {
          data: moviesData,
          isLoading: isMoviesLoading,
          isError: isMoviesError,
        },
        userMovies: {
          data: userMoviesData,
          isLoading: isUserMoviesLoading,
          isError: isUserMoviesError,
        },
        setMovieStatus,
        resetApp,
      }}
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
