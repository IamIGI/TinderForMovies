import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import Card, { CardRef } from '../../src/components/Card/Card';
import { MoviesContext } from '../../src/context/MoviesContext';
import { vi, describe, beforeEach, it, expect } from 'vitest';

const mockSetMovieStatus = vi.fn();
const mockResetApp = vi.fn();
const cardRef = React.createRef<CardRef>();

const setup = () => {
  // Wrap the Card component in a context provider to simulate real behavior
  render(
    <MoviesContext.Provider
      value={{
        movies: {
          isLoading: false,
          isError: false,
          data: [],
        },
        userMovies: {
          isLoading: false,
          isError: false,
          data: {
            liked: [],
            disliked: [],
          },
        },
        setMovieStatus: mockSetMovieStatus,
        resetApp: mockResetApp,
      }}
    >
      <Card
        ref={cardRef}
        id="1"
        imageUrl="https://example.com/image.jpg"
        rating={5}
        summary="This is a test movie summary"
        title="Test Movie"
      />
    </MoviesContext.Provider>
  );
};

describe('Card', () => {
  beforeEach(() => {
    mockSetMovieStatus.mockClear();
    cleanup();
  });

  it('should render the card with given props', () => {
    setup();

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test movie summary')
    ).toBeInTheDocument();
    expect(screen.getByText('5.0')).toBeInTheDocument(); //check for rating format
    expect(screen.getByAltText('rate')).toBeInTheDocument(); // the star image
  });

  it('should add movie to LIKED by button', async () => {
    setup();

    const addToLikedButton = screen.getByTestId('liked');
    addToLikedButton.click();

    // Check if the setMovieStatus function was called with true (liked movie)
    await waitFor(() => {
      expect(mockSetMovieStatus).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '1',
          imageUrl: 'https://example.com/image.jpg',
          rating: 5,
          summary: 'This is a test movie summary',
          title: 'Test Movie',
        }),
        true
      );
    });
  });

  it('should add movie to DISLIKED by button', async () => {
    setup();

    const addToLikedButton = screen.getByTestId('disliked');
    addToLikedButton.click();

    await waitFor(() => {
      expect(mockSetMovieStatus).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '1',
          imageUrl: 'https://example.com/image.jpg',
          rating: 5,
          summary: 'This is a test movie summary',
          title: 'Test Movie',
        }),
        false
      );
    });
  });

  it('should add movie to DISLIKED by keyboard button, triggered via ref', async () => {
    setup();

    cardRef.current!.addMovieToLiked();

    await waitFor(() => {
      expect(mockSetMovieStatus).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '1',
          imageUrl: 'https://example.com/image.jpg',
          rating: 5,
          summary: 'This is a test movie summary',
          title: 'Test Movie',
        }),
        true
      );
    });
  });

  it('should add movie to DISLIKED by keyboard button, triggered via ref', async () => {
    setup();

    cardRef.current!.addMovieToDisliked();

    await waitFor(() => {
      expect(mockSetMovieStatus).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '1',
          imageUrl: 'https://example.com/image.jpg',
          rating: 5,
          summary: 'This is a test movie summary',
          title: 'Test Movie',
        }),
        false
      );
    });
  });

  //TEST DO NOT WORK...
  //   it('should add movie to LIKED by dragging card to the left', async () => {
  //     setup();

  //     const cardElement = screen.getByTestId('card');
  //     expect(mockSetMovieStatus).toHaveBeenCalledTimes(0);

  //     //DOES not work on motion/react  || /frame-motion lib
  //     fireEvent.mouseDown(cardElement, { clientX: 0 });
  //     fireEvent.mouseDown(cardElement, { clientX: -200 });
  //     fireEvent.mouseUp(cardElement);

  //     await waitFor(() => {
  //       expect(mockSetMovieStatus).toHaveBeenCalledWith(
  //         expect.objectContaining({
  //           id: '1',
  //           imageUrl: 'https://example.com/image.jpg',
  //           rating: 5,
  //           summary: 'This is a test movie summary',
  //           title: 'Test Movie',
  //         }),
  //         true
  //       );
  //     });
  //   });
});
