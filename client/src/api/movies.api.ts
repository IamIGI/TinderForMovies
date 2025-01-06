// src/api/movies.api.ts

import {
  FetchMovieRequest,
  MovieDataResponse,
  UpdateMovieStatusRequest,
  UserMovieDataResponse,
} from '../interfaces/movie.interface.';

console.log('PROD:', import.meta.env.VITE_PROD);
const BASE_URL =
  import.meta.env.VITE_PROD === 'true'
    ? 'https://api.igitest.pl/movies'
    : 'http://localhost:3000/movies'; // Change this to your actual backend URL
console.log(BASE_URL);

async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return undefined;
  }
}

async function fetchMovies(
  payload?: FetchMovieRequest
): Promise<MovieDataResponse> {
  let url = BASE_URL;
  if (payload) {
    url = `${BASE_URL}?space=${payload.space}&amount=${payload.amount}`;
  }

  return fetchData(url);
}

async function fetchUserMovies(): Promise<UserMovieDataResponse> {
  const url = `${BASE_URL}/user`;
  return fetchData(url);
}

async function updateMovieStatus(payload: UpdateMovieStatusRequest) {
  const url = `${BASE_URL}?id=${payload.id}&status=${payload.status}`;
  try {
    const response = await fetch(url, { method: 'PATCH' });
    if (!response.ok) {
      throw new Error('Failed to update movie status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating movie status:', error);
    return undefined;
  }
}

async function resetMovies() {
  const url = `${BASE_URL}/reset`;
  try {
    const response = await fetch(url, { method: 'POST' });
    if (!response.ok) {
      throw new Error('Failed to reset movie database');
    }
    return await response.json();
  } catch (error) {
    console.error('Error resetting movie database:', error);
    return undefined;
  }
}

export default {
  fetchMovies,
  fetchUserMovies,
  updateMovieStatus,
  resetMovies,
};
