import c from './Navigation.module.scss';

interface NavigationProps {
  toggleMenuVisibility: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ toggleMenuVisibility }) => {
  return (
    <nav>
      <div className={c.leftWrapper}>
        <img className="accent-svg-icon" src="/svg/logo.svg" alt="logo" />
        <h2>
          <span>Tinder</span>
          <br />
          Movies
        </h2>
      </div>
      <div className={c.rightWrapper}>
        {/* Mock button */}
        <button className="hover-effect">
          <img
            className="hover-effect accent-svg-icon"
            src="/svg/menu/settings.svg"
            alt="settings"
          />
        </button>
        <button
          className={`${c.mobileMenuButton} hover-effect`}
          onClick={toggleMenuVisibility}
        >
          <img
            className="hover-effect accent-svg-icon"
            src="/svg/menu/menu.svg"
            alt="settings"
          />
        </button>
        <button className={`${c.logoButton} hover-effect`}>
          <img
            className="hover-effect"
            src="/images/profile.JPG"
            alt="profile"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
