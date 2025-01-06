import { useEffect, useRef } from 'react';
import Card, { CardRef } from '../Card/Card';
import c from './SwipeCards.module.scss';
import Loading from '../Loading/Loading';
import { useMoviesContext } from '../../context/MoviesContext';

const SwipeCards = () => {
  const {
    movies: { data, isLoading },
  } = useMoviesContext();
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
  }, []);

  return (
    <div className={c.wrapper}>
      {isLoading ? (
        <Loading />
      ) : (
        data.map((movie, i) => {
          const isLastCard = i === data.length - 1;
          return (
            <Card
              key={movie.id}
              {...movie}
              ref={isLastCard ? lastCardRef : null}
            />
          );
        })
      )}
    </div>
  );
};

export default SwipeCards;
