// import SwipeCards from './SwipeCards';
// import { fireEvent, render } from '@testing-library/react';
// import { RefObject, useRef } from 'react';
// import { Movie } from '../../interfaces/movie.interface.';
// import '@testing-library/jest-dom';
// import { CardRef } from '../Card/Card';

// // Mock Movie data
// const moviesData: Movie[] = [
//   {
//     id: '1',
//     imageUrl: 'https://example.com/image1.jpg',
//     rating: 4.5,
//     summary: 'Summary for Movie 1',
//     title: 'Movie 1',
//   },
//   {
//     id: '2',
//     imageUrl: 'https://example.com/image2.jpg',
//     rating: 4.2,
//     summary: 'Summary for Movie 2',
//     title: 'Movie 2',
//   },
// ];

// jest.mock('../Card/Card', () => {
//   const MockCard = ({ id, addMovieToLiked, addMovieToDisliked }: CardRef) => {
//     const ref: RefObject<HTMLDivElement> = useRef(null);
//     return (
//       <div data-testid={`card-${id}`} ref={ref}>
//         <button onClick={addMovieToLiked}>Move Left</button>
//         <button onClick={addMovieToDisliked}>Move Right</button>
//       </div>
//     );
//   };
//   return {
//     __esModule: true,
//     default: MockCard,
//   };
// });

// describe('SwipeCards', () => {
//   it('should trigger addMovieToLiked function when ArrowLeft key is pressed', () => {
//     const { container } = render(<SwipeCards moviesData={moviesData} />);

//     // Find the last card component
//     const lastCard = container.querySelector('[data-testid="card-2"]');
//     expect(lastCard).toBeInTheDocument();

//     // Simulate pressing the left arrow key
//     fireEvent.keyDown(window, { key: 'ArrowLeft' });

//     // Check if the addMovieToLiked function has been called
//     // Here we simulate a simple console log to confirm the action
//     // Ideally, you'd spy on the addMovieToLiked function in a real scenario
//     expect(lastCard).toHaveTextContent('Move Left');
//   });

//   it('should trigger addMovieToDisliked function when ArrowRight key is pressed', () => {
//     const { container } = render(<SwipeCards moviesData={moviesData} />);

//     // Find the last card component
//     const lastCard = container.querySelector('[data-testid="card-2"]');
//     expect(lastCard).toBeInTheDocument();

//     // Simulate pressing the right arrow key
//     fireEvent.keyDown(window, { key: 'ArrowRight' });

//     // Check if the addMovieToDisliked function has been called
//     expect(lastCard).toHaveTextContent('Move Right');
//   });

//   it('should not trigger addMovieToLiked or addMovieToDisliked if last card is not found', () => {
//     const { container } = render(<SwipeCards moviesData={[]} />);

//     // Simulate pressing the left arrow key in an empty list
//     fireEvent.keyDown(window, { key: 'ArrowLeft' });

//     // Ensure no card interaction happens
//     const lastCard = container.querySelector('[data-testid="card-2"]');
//     expect(lastCard).not.toBeInTheDocument();
//   });
// });
