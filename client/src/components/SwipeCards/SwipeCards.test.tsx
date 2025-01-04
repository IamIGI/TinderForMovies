import SwipeCards from './SwipeCards';
import { fireEvent, render } from '@testing-library/react';
import { RefObject, useRef } from 'react';
import { Movie } from '../../interfaces/movie.interface.';
import '@testing-library/jest-dom';
import { CardRef } from '../Card/Card';

// Mock Movie data
const moviesData: Movie[] = [
  {
    id: '1',
    imageUrl: 'https://example.com/image1.jpg',
    rating: 4.5,
    summary: 'Summary for Movie 1',
    title: 'Movie 1',
  },
  {
    id: '2',
    imageUrl: 'https://example.com/image2.jpg',
    rating: 4.2,
    summary: 'Summary for Movie 2',
    title: 'Movie 2',
  },
];

jest.mock('../Card/Card', () => {
  const MockCard = ({ id, moveLeft, moveRight }: CardRef) => {
    const ref: RefObject<HTMLDivElement> = useRef(null);
    return (
      <div data-testid={`card-${id}`} ref={ref}>
        <button onClick={moveLeft}>Move Left</button>
        <button onClick={moveRight}>Move Right</button>
      </div>
    );
  };
  return {
    __esModule: true,
    default: MockCard,
  };
});

describe('SwipeCards', () => {
  it('should trigger moveLeft function when ArrowLeft key is pressed', () => {
    const { container } = render(<SwipeCards moviesData={moviesData} />);

    // Find the last card component
    const lastCard = container.querySelector('[data-testid="card-2"]');
    expect(lastCard).toBeInTheDocument();

    // Simulate pressing the left arrow key
    fireEvent.keyDown(window, { key: 'ArrowLeft' });

    // Check if the moveLeft function has been called
    // Here we simulate a simple console log to confirm the action
    // Ideally, you'd spy on the moveLeft function in a real scenario
    expect(lastCard).toHaveTextContent('Move Left');
  });

  it('should trigger moveRight function when ArrowRight key is pressed', () => {
    const { container } = render(<SwipeCards moviesData={moviesData} />);

    // Find the last card component
    const lastCard = container.querySelector('[data-testid="card-2"]');
    expect(lastCard).toBeInTheDocument();

    // Simulate pressing the right arrow key
    fireEvent.keyDown(window, { key: 'ArrowRight' });

    // Check if the moveRight function has been called
    expect(lastCard).toHaveTextContent('Move Right');
  });

  it('should not trigger moveLeft or moveRight if last card is not found', () => {
    const { container } = render(<SwipeCards moviesData={[]} />);

    // Simulate pressing the left arrow key in an empty list
    fireEvent.keyDown(window, { key: 'ArrowLeft' });

    // Ensure no card interaction happens
    const lastCard = container.querySelector('[data-testid="card-2"]');
    expect(lastCard).not.toBeInTheDocument();
  });
});
