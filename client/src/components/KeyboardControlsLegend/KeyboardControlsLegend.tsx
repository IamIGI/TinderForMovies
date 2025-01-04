import c from './KeyboardControlsLegend.module.scss';

const KeyboardControlsLegend = () => {
  return (
    <div className={c.wrapper}>
      <div className={c.keyboard}>
        <img
          className="white-svg-icon"
          src="/svg/keyboard/arrowLeft.svg"
          alt="arrow"
        />
        <h3>Add</h3>
      </div>
      <div className={c.keyboard}>
        <img
          className="white-svg-icon"
          src="/svg/keyboard/arrowRight.svg"
          alt="arrow"
        />
        <h3>Discard</h3>
      </div>
    </div>
  );
};

export default KeyboardControlsLegend;
