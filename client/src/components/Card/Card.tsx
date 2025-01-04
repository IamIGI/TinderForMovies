import { useMoviesContext } from '../../context/MoviesContext';
import { Movie } from '../../interfaces/movie.interface.';
import CardActions from './CardActions/CardActions';
import c from './Card.module.scss';
import {
  animate,
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { forwardRef, Ref, useImperativeHandle, useRef } from 'react';

export type CardRef = {
  moveLeft: () => void;
  moveRight: () => void;
  id: string;
};

const Card = (
  { id, imageUrl, rating, summary, title }: Movie,
  ref: Ref<CardRef>
) => {
  const movieData = { id, imageUrl, rating, summary, title };
  const { setMovieStatus } = useMoviesContext();
  const cardRef = useRef<HTMLDivElement>(null);
  //
  const dragEnd = 560;
  const position = useMotionValue(0);
  const opacity = useTransform(position, [-dragEnd, 0, dragEnd], [0.3, 1, 0.3]);
  const rotate = useTransform(position, [-dragEnd, dragEnd], [-30, 30]);

  const handleDragEnd = (_: MouseEvent, info: PanInfo) => {
    if (info.offset.x > dragEnd) {
      setMovieStatus(movieData, false);
    } else if (info.offset.x < -dragEnd) {
      setMovieStatus(movieData, true);
    }
  };

  const moveLeft = () => {
    animate(position, -dragEnd, { duration: 0.5 }).then(() => {
      setMovieStatus(movieData, true);
    });
  };

  const moveRight = () => {
    animate(position, dragEnd, { duration: 0.5 }).then(() => {
      setMovieStatus(movieData, false);
    });
  };

  useImperativeHandle(ref, () => ({
    moveLeft,
    moveRight,
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
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      // dragElastic={0.2}
      onDragEnd={handleDragEnd}
    >
      <div className={c.ratingWrapper}>
        <div className={c.ratingContent}>
          <img
            className="white-svg-icon"
            src="svg/card/star.svg"
            alt={'rate'}
          />
          <h2>{rating}</h2>
        </div>
      </div>
      <div className={c.downContent}>
        <div className={c.descriptionWrapper}>
          <h1>{title}</h1>
          <p>{summary}</p>
        </div>
        <CardActions moveLeft={moveLeft} moveRight={moveRight} />
      </div>
    </motion.div>
  );
};

export default forwardRef(Card);
