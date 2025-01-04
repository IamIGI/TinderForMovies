import c from './CardActions.module.scss';

interface CardActionsProps {
  moveLeft: () => void;
  moveRight: () => void;
}

const CardActions: React.FC<CardActionsProps> = ({ moveLeft, moveRight }) => {
  return (
    <div className={c.wrapper}>
      <button onClick={moveLeft}>
        <img className="white-svg-icon" src="svg/card/love.svg" alt="love" />
      </button>
      {/* Just mock button */}
      <button>
        <img
          className="white-svg-icon"
          src="svg/card/playPause.svg"
          alt="love"
        />
      </button>
      <button onClick={moveRight}>
        <img
          className="white-svg-icon"
          src="svg/card/cancel2.svg"
          alt="cancel"
        />
      </button>
    </div>
  );
};

export default CardActions;
