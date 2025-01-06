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
import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const dragEnd = isMobile ? 200 : 560;

  const position = useMotionValue(0);
  const opacity = useTransform(position, [-dragEnd, 0, dragEnd], [0.3, 1, 0.3]);
  const rotate = useTransform(position, [-dragEnd, dragEnd], [-30, 30]);

  useEffect(() => {
    const handleResize = () => {
      const isCurrentlyMobile = window.innerWidth < 500;
      if (isCurrentlyMobile !== isMobile) {
        setIsMobile(isCurrentlyMobile);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const handleDragEnd = (_: MouseEvent, info: PanInfo) => {
    if (info.offset.x > dragEnd) {
      setMovieStatus(movieData, false);
    } else if (info.offset.x < -dragEnd) {
      setMovieStatus(movieData, true);
    }
  };

  const isTheSameCard = () => {
    if (lastCardId === movieData.id) return true;
    setLastCardId(movieData.id);
    return false;
  };

  const addMovieToLiked = () => {
    if (isTheSameCard()) return;

    animate(position, -dragEnd, { duration: 0.5 }).then(() => {
      setMovieStatus(movieData, true);
    });
  };

  const addMovieToDisliked = () => {
    if (isTheSameCard()) return;

    animate(position, dragEnd, { duration: 0.5 }).then(() => {
      setMovieStatus(movieData, false);
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
      }}
      drag={isMobile ? 'x' : true}
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
