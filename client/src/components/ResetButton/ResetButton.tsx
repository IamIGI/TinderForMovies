import c from './ResetButton.module.scss';

interface ResetButtonProps {
  resetApp: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ resetApp }) => {
  return (
    <button
      role="button"
      className={`${c.resetButton} hover-effect`}
      onClick={resetApp}
    >
      <img
        className="white-svg-icon hover-effect"
        src="/svg/buttons/reset.svg"
        alt="reset"
      />
    </button>
  );
};

export default ResetButton;
