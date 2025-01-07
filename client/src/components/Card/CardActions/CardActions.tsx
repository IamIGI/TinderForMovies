import c from './CardActions.module.scss';

interface CardActionsProps {
  addMovieToLiked: () => void;
  addMovieToDisliked: () => void;
}

const CardActions: React.FC<CardActionsProps> = ({
  addMovieToLiked,
  addMovieToDisliked,
}) => {
  return (
    <div className={c.wrapper}>
      <button onClick={addMovieToLiked} className="hover-effect">
        <img
          data-testid="liked"
          className="white-svg-icon hover-effect"
          src="svg/card/love.svg"
          alt="love"
        />
      </button>
      {/* Just mock button */}
      <button className="hover-effect">
        <img
          className="white-svg-icon hover-effect "
          src="svg/card/playPause.svg"
          alt="playPause"
        />
      </button>
      <button
        data-testid="disliked"
        onClick={addMovieToDisliked}
        className="hover-effect"
      >
        <img
          className="white-svg-icon hover-effect"
          src="svg/card/cancel2.svg"
          alt="cancel"
        />
      </button>
    </div>
  );
};

export default CardActions;
