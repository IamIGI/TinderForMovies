import c from './Actions.module.scss';

const Actions = () => {
  return (
    <div className={c.wrapper}>
      <button>
        <img className="white-svg-icon" src="svg/card/love.svg" alt="love" />
      </button>
      <button>
        <img
          className="white-svg-icon"
          src="svg/card/playPause.svg"
          alt="love"
        />
      </button>
      <button>
        <img
          className="white-svg-icon"
          src="svg/card/cancel2.svg"
          alt="cancel"
        />
      </button>
    </div>
  );
};

export default Actions;
