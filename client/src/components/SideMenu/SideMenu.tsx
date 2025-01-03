import c from './SideMenu.module.scss';

interface SideMenuProps {
  isVisible: boolean;
  onCloseCart: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isVisible, onCloseCart }) => {
  return <div className={c.wrapper}>SideMenu</div>;
};

export default SideMenu;
