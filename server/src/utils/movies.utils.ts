import { Movie } from '../interfaces/movie.interface';

function getMoviesWithoutUserSelectedMovies(
  likedMovies: Movie[],
  dislikedMovies: Movie[],
  dbMovies: Movie[]
) {
  const selectedMovies = new Set([
    ...likedMovies.map((m) => m.id),
    dislikedMovies.map((m) => m.id),
  ]);
  return dbMovies.filter((m) => !selectedMovies.has(m.id));
}

export default {
  getMoviesWithoutUserSelectedMovies,
};
