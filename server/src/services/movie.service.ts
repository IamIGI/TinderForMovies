import path from 'path';
import {
  MovieStatus,
  PaginatedMoviesData,
} from '../interfaces/movie.interface';
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

function getUserMovies() {
  const likedMovies = filesUtils.readJSONFile(LIKED_MOVIES_FILE_PATH);
  const dislikedMovies = filesUtils.readJSONFile(DISLIKED_MOVIES_FILE_PATH);

  return {
    liked: likedMovies,
    disliked: dislikedMovies,
  };
}

function getMoviesWithingRange(
  space: number | undefined,
  amount: number | undefined
): PaginatedMoviesData {
  const moviesDB = filesUtils.readJSONFile(MOVIES_FILE_PATH);
  const likedMovies = filesUtils.readJSONFile(LIKED_MOVIES_FILE_PATH);
  const dislikedMovies = filesUtils.readJSONFile(DISLIKED_MOVIES_FILE_PATH);

  const startIndex = space
    ? likedMovies.length + dislikedMovies.length + space
    : likedMovies.length + dislikedMovies.length;

  const endIndex =
    amount !== undefined
      ? Math.min(startIndex + amount, moviesDB.length)
      : moviesDB.length;

  const moviesInRange = moviesDB.slice(startIndex, endIndex);
  const reversedList = moviesInRange.reverse();

  return {
    from: startIndex,
    amount: amount,
    totalMovies: reversedList.length,
    movies: reversedList,
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
      filesUtils.writeJSONFile(DISLIKED_MOVIES_FILE_PATH, dislikedMovies);
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
  // const removedElement = tinderMovies.splice(selectedMovieIndex, 1);
  // console.log(removedElement);
  // filesUtils.writeJSONFile(MOVIES_FILE_PATH, tinderMovies);

  return updatedMovieList;
}

function resetDB() {
  // const initMoviesData = filesUtils.readJSONFile(INIT_MOVIES_FILE_PATH);
  // filesUtils.writeJSONFile(MOVIES_FILE_PATH, initMoviesData);
  filesUtils.removeJSONFile(LIKED_MOVIES_FILE_PATH);
  filesUtils.removeJSONFile(DISLIKED_MOVIES_FILE_PATH);
}

export default {
  getMoviesWithingRange,
  updateMovieStatus,
  getUserMovies,
  resetDB,
};
