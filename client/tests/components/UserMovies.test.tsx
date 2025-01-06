import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import UserMovies from '../../src/components/Menu/UserMovies/UserMovies';
import { Movie } from '../../src/interfaces/movie.interface.';

// Ensure the DOM is cleared after each test

// scree

describe('UserMovies', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const mockLikedMovies: Movie[] = [
    {
      id: '1',
      title: 'Movie 1',
      imageUrl: 'https://example.com/movie1@._V1_.jpg',
      rating: 9.0,
      summary: 'Lorem Ipsum...',
    },
    {
      id: '2',
      title: 'Movie 2',
      imageUrl: 'https://example.com/movie2@._V1_.jpg',
      rating: 9.0,
      summary: 'Lorem Ipsum...',
    },
  ];
  const mockDislikedMovies: Movie[] = [
    {
      id: '3',
      title: 'Movie 3',
      imageUrl: 'https://example.com/movie3@._V1_.jpg',
      rating: 9.0,
      summary: 'Lorem Ipsum...',
    },
  ];
  const mockHandleSelectedMovie = vi.fn();

  it('should renders loading state when isDataFetching is true', () => {
    render(
      <UserMovies
        likedMovies={mockLikedMovies}
        dislikedMovies={mockDislikedMovies}
        handleSelectedMovie={mockHandleSelectedMovie}
        isDataFetching={true}
      />
    );

    const loadingScreen = screen.getByTestId('loading');

    expect(loadingScreen).toBeInTheDocument();
  });

  it('should renders liked and disliked movies when isDataFetching is false', () => {
    render(
      <UserMovies
        likedMovies={mockLikedMovies}
        dislikedMovies={mockDislikedMovies}
        handleSelectedMovie={mockHandleSelectedMovie}
        isDataFetching={false}
      />
    );
    // screen.debug();
    // screen.getByText(/liked/i)
    const likedSection = screen.getByText('Liked', { exact: true });
    const dislikedSection = screen.getByText('Disliked', { exact: true });

    expect(likedSection).toBeInTheDocument();
    expect(dislikedSection).toBeInTheDocument();

    expect(screen.getAllByRole('img')).toHaveLength(3); // 2 liked + 1 disliked
  });

  it('should calls handleSelectedMovie with correct movie when a movie is clicked', async () => {
    render(
      <UserMovies
        likedMovies={mockLikedMovies}
        dislikedMovies={mockDislikedMovies}
        handleSelectedMovie={mockHandleSelectedMovie}
        isDataFetching={false}
      />
    );

    const movieButton = screen.getAllByRole('button')[0];

    movieButton.click();

    expect(mockHandleSelectedMovie).toHaveBeenCalledWith(mockLikedMovies[0]);
  });

  it('should renders buttons for each movie', () => {
    render(
      <UserMovies
        likedMovies={mockLikedMovies}
        dislikedMovies={mockDislikedMovies}
        handleSelectedMovie={mockHandleSelectedMovie}
        isDataFetching={false}
      />
    );

    const motionButtons = screen.getAllByRole('button');
    expect(motionButtons).toHaveLength(3); // 2 liked + 1 disliked
    motionButtons.forEach((button) => {
      expect(button).toHaveClass('hover-effect');
    });
  });

  it('should use smaller images for better performance', () => {
    render(
      <UserMovies
        likedMovies={mockLikedMovies}
        dislikedMovies={mockDislikedMovies}
        handleSelectedMovie={mockHandleSelectedMovie}
        isDataFetching={false}
      />
    );

    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute(
      'src',
      'https://example.com/movie1@._V1_QL75_UX140_CR0,1,140,207_.jpg'
    );
  });
});
