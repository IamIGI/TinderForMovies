export interface Movie {
  id: string;
  imageUrl: string;
  title: string;
  summary: string;
  rating: number;
}

export interface PaginatedMoviesData {
  from: number;
  amount: number | undefined;
  totalMovies: number;
  movies: Movie[];
}

export enum MovieStatus {
  Liked = 'liked',
  DisLiked = 'disliked',
}
