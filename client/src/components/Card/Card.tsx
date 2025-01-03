import { Movie } from '../../interfaces/movie.interface.';
import Actions from './Actions/Actions';
import c from './Card.module.scss';

const Card: React.FC<Movie> = ({ id, imageUrl, rating, summary, title }) => {
  return (
    <div
      id={id}
      className={c.wrapper}
      style={{ backgroundImage: `url(${imageUrl})` }}
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
    </div>
  );
};

export default Card;
