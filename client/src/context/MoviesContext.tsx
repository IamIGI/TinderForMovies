import moviesApi from '../api/movies.api';
import {
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
  setMovieStatus: (movie: Movie, isMovieLiked: boolean) => void;
}

const MoviesContext = createContext<MoviesContextInterface | undefined>(
  undefined
);

export const MovieContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [userMoviesData, setUserMoviesData] = useState<UserMovieDataResponse>({
    liked: [],
    disliked: [],
  });

  // Loading and error states for movies and user movies
  const [isMoviesLoading, setIsMoviesLoading] = useState<boolean>(false);
  const [isUserMoviesLoading, setIsUserMoviesLoading] =
    useState<boolean>(false);
  const [isMoviesError, setIsMoviesError] = useState<boolean>(false);
  const [isUserMoviesError, setIsUserMoviesError] = useState<boolean>(false);

  //Init
  useEffect(() => {
    const loadMoviesAndUserMovies = async () => {
      setIsMoviesLoading(true);
      setIsUserMoviesLoading(true);
      setIsMoviesError(false); // Reset error state on each fetch attempt
      setIsUserMoviesError(false); // Reset error state on each fetch attempt

      try {
        // Fetch movies
        const movieData = await moviesApi.fetchMovies();
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

    loadMoviesAndUserMovies();
  }, []);

  const setMovieStatus = (movie: Movie, isMovieLiked: boolean) => {
    setMoviesData((prevMovies) => prevMovies.filter((m) => m.id !== movie.id));
    //When updated check for number of movie items in the list, and refetch again if necessary
    const updatedUserMovies = { ...userMoviesData };

    if (isMovieLiked) {
      updatedUserMovies.liked = [...updatedUserMovies.liked, movie];
    } else {
      updatedUserMovies.disliked = [...updatedUserMovies.disliked, movie];
    }
    setUserMoviesData(updatedUserMovies);

    // Update movie status on the server
    moviesApi
      .updateMovieStatus({
        id: movie.id,
        status: isMovieLiked ? MovieStatus.Liked : MovieStatus.DisLiked,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Failed to update movie status:', error);
      });
  };

  // const refetchMovies = async (payload: FetchMovieRequest) => {
  //   setIsMoviesLoading(true);
  //   setIsMoviesError(false); // Reset error state on each refetch

  //   try {
  //     const movieData = await moviesApi.fetchMovies(payload);
  //     if (movieData === undefined) {
  //       setIsMoviesError(true);
  //     } else {
  //       setMoviesData(movieData);
  //     }
  //   } catch (error) {
  //     console.error('Failed to refetch movies:', error);
  //     setIsMoviesError(true);
  //   } finally {
  //     setIsMoviesLoading(false);
  //   }
  // };

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
