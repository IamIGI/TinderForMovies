import { Movie } from '../../interfaces/movie.interface.';
import c from './Card.module.scss';

const Card: React.FC<Movie> = ({ id, imageUrl, rating, summary, title }) => {
  return (
    <div
      id={id}
      className={c.wrapper}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      Card
    </div>
  );
};

export default Card;
