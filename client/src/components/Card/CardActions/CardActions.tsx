import c from './CardActions.module.scss';

interface CardActionsProps {
  moveLeft: () => void;
  moveRight: () => void;
}

const CardActions: React.FC<CardActionsProps> = ({ moveLeft, moveRight }) => {
  return (
    <div className={c.wrapper}>
      <button onClick={moveLeft} className="hover-effect">
        <img
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
          alt="love"
        />
      </button>
      <button onClick={moveRight} className="hover-effect">
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
