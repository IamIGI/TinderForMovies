import path from 'path';
import { MovieStatus, PaginatedMovieData } from '../interfaces/movie.interface';
import filesUtils from '../utils/files.utils';

const DB_FOLDER_FILE_PATH = '../../mockDatabase';
const MOVIES_FILE_PATH = path.join(
  __dirname,
  `${DB_FOLDER_FILE_PATH}/movies.json`
);
const LIKED_MOVIES_FILE_PATH = path.join(
  __dirname,
  `${DB_FOLDER_FILE_PATH}/likedMovies.json`
);
const DISLIKED_MOVIES_FILE_PATH = path.join(
  __dirname,
  `${DB_FOLDER_FILE_PATH}/dislikedMovies.json`
);
const INIT_MOVIES_FILE_PATH = path.join(
  __dirname,
  `${DB_FOLDER_FILE_PATH}/initMovies.json`
);

function getUserMovies() {
  const likedMovies = filesUtils.readJSONFile(LIKED_MOVIES_FILE_PATH);
  const dislikedMovies = filesUtils.readJSONFile(DISLIKED_MOVIES_FILE_PATH);

  return {
    liked: likedMovies,
    disliked: dislikedMovies,
  };
}

function getMoviesWithPagination(
  from: number,
  amount: number | undefined
): PaginatedMovieData {
  const tinderMovies = filesUtils.readJSONFile(MOVIES_FILE_PATH);
  const startIndex = Math.max(0, from);
  const endIndex =
    amount !== undefined
      ? Math.min(startIndex + amount, tinderMovies.length)
      : tinderMovies.length;

  const moviesInRange = tinderMovies.slice(startIndex, endIndex);

  return {
    from: startIndex,
    to: endIndex,
    length: moviesInRange.length,
    totalMovies: tinderMovies.length,
    movies: moviesInRange,
  };
}

function updateMovieStatus(movieId: string, status: MovieStatus) {
  const tinderMovies = filesUtils.readJSONFile(MOVIES_FILE_PATH);
  const selectedMovieIndex = tinderMovies.findIndex(
    (movie) => movie.id === movieId
  );

  if (selectedMovieIndex === -1) {
    console.log('movie not found, id: ', movieId);
    return;
  }

  const selectedMovie = tinderMovies[selectedMovieIndex];
  const likedMovies = filesUtils.readJSONFile(LIKED_MOVIES_FILE_PATH);
  const dislikedMovies = filesUtils.readJSONFile(DISLIKED_MOVIES_FILE_PATH);

  let updatedMovieList = [];
  switch (status) {
    case MovieStatus.Liked:
      likedMovies.push(selectedMovie);
      filesUtils.writeJSONFile(LIKED_MOVIES_FILE_PATH, likedMovies);
      updatedMovieList = likedMovies;
      break;
    case MovieStatus.DisLiked:
      dislikedMovies.push(selectedMovie);
      filesUtils.writeJSONFile(DISLIKED_MOVIES_FILE_PATH, likedMovies);
      updatedMovieList = dislikedMovies;
      break;
    default:
      console.error(
        `Wrong status: ${status}\nAvailable status values: ${Object.values(
          MovieStatus
        )}`
      );
      return;
  }

  //DANGER ZONE - remove item from DB;
  tinderMovies.splice(selectedMovieIndex, 1);
  filesUtils.writeJSONFile(MOVIES_FILE_PATH, tinderMovies);

  return updatedMovieList;
}

function resetDB() {
  const initMoviesData = filesUtils.readJSONFile(INIT_MOVIES_FILE_PATH);
  filesUtils.writeJSONFile(MOVIES_FILE_PATH, initMoviesData);
  filesUtils.removeJSONFile(LIKED_MOVIES_FILE_PATH);
  filesUtils.removeJSONFile(DISLIKED_MOVIES_FILE_PATH);
}

export default {
  getMoviesWithPagination,
  updateMovieStatus,
  getUserMovies,
  resetDB,
};
