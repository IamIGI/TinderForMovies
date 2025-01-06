export interface Movie {
  id: string;
  imageUrl: string;
  title: string;
  summary: string;
  rating: number;
}

export interface FetchMovieRequest {
  amount: number;
  space?: number;
}

export interface UpdateMovieStatusRequest {
  id: string;
  status: MovieStatus;
}

export interface MovieDataResponse {
  from: number;
  amount: number | undefined;
  totalMovies: number;
  movies: Movie[];
}
export interface UserMovieDataResponse {
  liked: Movie[];
  disliked: Movie[];
}

export enum MovieStatus {
  Liked = 'liked',
  DisLiked = 'disliked',
}
