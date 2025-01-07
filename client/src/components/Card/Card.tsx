import { useMoviesContext } from '../../context/MoviesContext';
import { Movie } from '../../interfaces/movie.interface.';
import CardActions from './CardActions/CardActions';
import c from './Card.module.scss';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react';
import numberUtils from '../../utils/number.utils';

export type CardRef = {
  addMovieToLiked: () => void;
  addMovieToDisliked: () => void;
  id: string;
};

const Card = (
  { id, imageUrl, rating, summary, title }: Movie,
  ref: Ref<CardRef>
) => {
  const movieData = { id, imageUrl, rating, summary, title };
  const { setMovieStatus } = useMoviesContext();
  const [lastCardId, setLastCardId] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const dragEnd = 140; //Best for mobile phones
  const position = useMotionValue(0);
  const opacity = useTransform(position, [-dragEnd, 0, dragEnd], [0.3, 1, 0.3]);
  const rotate = useTransform(position, [-dragEnd, dragEnd], [-20, 20]);
  const scale = useTransform(position, [-dragEnd, 0, dragEnd], [0.7, 1, 0.7]);

  const handleDragEnd = async () => {
    if (position.get() > dragEnd) {
      await setMovieStatus(movieData, false);
    } else if (position.get() < -dragEnd) {
      await setMovieStatus(movieData, true);
    }
  };

  const isTheSameCard = () => {
    if (lastCardId === movieData.id) return true;
    setLastCardId(movieData.id);
    return false;
  };

  const addMovieToLiked = async () => {
    if (isTheSameCard()) return;
    animate(position, -dragEnd - 100, { duration: 0.3 }).then(async () => {
      await setMovieStatus(movieData, true);
    });
  };

  const addMovieToDisliked = () => {
    if (isTheSameCard()) return;

    animate(position, dragEnd + 100, { duration: 0.3 }).then(async () => {
      await setMovieStatus(movieData, false);
    });
  };

  useImperativeHandle(ref, () => ({
    addMovieToLiked,
    addMovieToDisliked,
    id: cardRef.current?.id || '',
  }));

  return (
    <motion.div
      ref={cardRef}
      id={id}
      className={c.wrapper}
      style={{
        backgroundImage: `url(${imageUrl})`,
        x: position,
        opacity,
        rotate,
        scale,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      data-testid="card"
    >
      <div className={c.ratingWrapper}>
        <div className={c.ratingContent}>
          <img
            className="white-svg-icon"
            src="svg/card/star.svg"
            alt={'rate'}
          />
          <h2>{numberUtils.formatNumberWithDecimal(rating)}</h2>
        </div>
      </div>
      <div className={c.downContent}>
        <div className={c.descriptionWrapper}>
          <h1>{title}</h1>
          <p>{summary}</p>
        </div>
        <CardActions
          addMovieToLiked={addMovieToLiked}
          addMovieToDisliked={addMovieToDisliked}
        />
      </div>
    </motion.div>
  );
};

export default forwardRef(Card);
