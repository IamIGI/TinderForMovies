import KeyboardControlsLegend from '../../components/KeyboardControlsLegend/KeyboardControlsLegend';
import SwipeCards from '../../components/SwipeCards/SwipeCards';
import c from './Home.module.scss';
import Menu from '../../components/Menu/Menu';
import Navigation from '../../components/Menu/Navigation/Navigation';
import { useToggleState } from '../../hooks/useToggleState';

const Home = () => {
  const [isMenuVisible, toggleMenuVisibility, setMenuVisibility] =
    useToggleState(window.innerWidth > 920);

  return (
    <div className={c.wrapper}>
      <Menu
        isMenuVisible={isMenuVisible}
        setMenuVisibility={setMenuVisibility}
      />
      <div className={c.content}>
        <SwipeCards />
        <KeyboardControlsLegend />
        <div className={c.mobileMenu}>
          <Navigation toggleMenuVisibility={toggleMenuVisibility} />
        </div>
      </div>
    </div>
  );
};

export default Home;
