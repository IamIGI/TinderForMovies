import { Dispatch, SetStateAction } from 'react';
import { Movie } from '../../interfaces/movie.interface.';
import Actions from './Actions/Actions';
import c from './Card.module.scss';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';

interface CardProps extends Movie {
  setMovies: Dispatch<SetStateAction<Movie[]>>;
}

const Card: React.FC<CardProps> = ({
  id,
  imageUrl,
  rating,
  summary,
  title,
  setMovies,
}) => {
  const dragEnd = 400;
  const position = useMotionValue(0);

  const opacity = useTransform(position, [-dragEnd, 0, dragEnd], [0.3, 1, 0.3]);
  const rotate = useTransform(position, [-dragEnd, dragEnd], [-30, 30]);

  function updateCardsStack() {
    setMovies((p) => p.filter((movie) => movie.id !== id));
  }

  const handleDragEnd = (_: MouseEvent, info: PanInfo) => {
    if (info.offset.x > dragEnd) {
      console.log('reject');
      updateCardsStack();
    } else if (info.offset.x < -dragEnd) {
      console.log('accept');
      updateCardsStack();
    }
  };

  return (
    <motion.div
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
        <Actions />
      </div>
    </motion.div>
  );
};

export default Card;
