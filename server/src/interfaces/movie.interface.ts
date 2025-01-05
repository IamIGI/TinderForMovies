export interface Movie {
  id: string;
  imageUrl: string;
  title: string;
  summary: string;
  rating: number;
}

export interface PaginatedMovieData {
  from: number;
  to: number;
  length: number;
  totalMovies: number;
  movies: Movie[];
}

export enum MovieStatus {
  Liked = 'liked',
  DisLiked = 'disliked',
}
