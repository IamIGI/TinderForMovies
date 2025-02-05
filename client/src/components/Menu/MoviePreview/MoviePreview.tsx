import { Movie } from '../../../interfaces/movie.interface.';
import numberUtils from '../../../utils/number.utils';
import c from './MoviePreview.module.scss';

interface MoviePreviewProps {
  movie: Movie | null;
  handleGoBack: () => void;
}

const MoviePreview: React.FC<MoviePreviewProps> = ({ movie, handleGoBack }) => {
  if (!movie) return;

  return (
    <div className={c.wrapper}>
      <button className="hover-effect" onClick={handleGoBack}>
        <img
          className="hover-effect accent-svg-icon"
          src="/svg/menu/back.svg"
          alt="back"
        />
      </button>
      <img src={movie.imageUrl} alt="movie" />
      <h1>
        {movie.title}
        <span>{numberUtils.formatNumberWithDecimal(movie.rating)}/10</span>
      </h1>
      <p>{movie.summary}</p>
    </div>
  );
};

export default MoviePreview;
