import { useEffect, useRef } from 'react';
import { Movie } from '../../interfaces/movie.interface.';
import Card, { CardRef } from '../Card/Card';
import c from './SwipeCards.module.scss';

interface SwipeCardsProps {
  moviesData: Movie[];
}
const SwipeCards: React.FC<SwipeCardsProps> = ({ moviesData }) => {
  const lastCardRef = useRef<CardRef>(null);

  const handleArrowsDown = (e: KeyboardEvent) => {
    const lastCard = lastCardRef.current;
    if (!lastCard) return;

    switch (e.key) {
      case 'ArrowLeft':
        lastCard.addMovieToLiked();
        break;
      case 'ArrowRight':
        lastCard.addMovieToDisliked();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleArrowsDown);

    return () => {
      window.removeEventListener('keydown', handleArrowsDown);
    };
  });

  return (
    <div
      className={c.wrapper}
      // style={{ backgroundImage: `url(${moviesData[0].imageUrl})` }}
    >
      {moviesData.map((movie, i) => {
        const isLastCard = i === moviesData.length - 1;
        return (
          <Card
            key={movie.id}
            {...movie}
            ref={isLastCard ? lastCardRef : null}
          />
        );
      })}
    </div>
  );
};

export default SwipeCards;
