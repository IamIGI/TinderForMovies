import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import CardActions from '../../src/components/Card/CardActions/CardActions';

describe('Card actions', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render 3 buttons', () => {
    render(
      <CardActions addMovieToLiked={() => {}} addMovieToDisliked={() => {}} />
    );

    // screen.debug();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toEqual(3);
  });

  it('should add movie to LIKED movies when clicked first button', () => {
    const mockAddMovieToLiked = vi.fn();
    render(
      <CardActions
        addMovieToLiked={mockAddMovieToLiked}
        addMovieToDisliked={() => {}}
      />
    );

    const acceptButton = screen.getAllByRole('button')[0];
    acceptButton.click();
    expect(acceptButton).toBeInTheDocument();
    expect(mockAddMovieToLiked).toHaveBeenCalledTimes(1);
  });

  it('should add movie to DISLIKED movies when clicked first button', () => {
    const mockAddMovieToDisliked = vi.fn();
    render(
      <CardActions
        addMovieToLiked={() => {}}
        addMovieToDisliked={mockAddMovieToDisliked}
      />
    );

    const acceptButton = screen.getAllByRole('button')[2];
    acceptButton.click();
    expect(acceptButton).toBeInTheDocument();
    expect(mockAddMovieToDisliked).toHaveBeenCalledTimes(1);
  });
});
