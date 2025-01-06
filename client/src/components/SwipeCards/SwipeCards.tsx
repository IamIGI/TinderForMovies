import { useEffect, useRef } from 'react';
import Card, { CardRef } from '../Card/Card';
import c from './SwipeCards.module.scss';
import Loading from '../Loading/Loading';
import { useMoviesContext } from '../../context/MoviesContext';
import ResetButton from '../ResetButton/ResetButton';

const SwipeCards = () => {
  const {
    movies: { data, isLoading },
    resetApp,
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
      ) : data.length === 0 ? (
        <ResetButton resetApp={resetApp} />
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
        // <Card {...data[0]} ref={lastCardRef} />
      )}
    </div>
  );
};

export default SwipeCards;
