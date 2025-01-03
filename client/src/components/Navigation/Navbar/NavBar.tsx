import c from './Navbar.module.scss';

interface NavBarProps {
  handleMenuClick: () => void;
}

const NavBar: React.FC<NavBarProps> = () => {
  return <div className={c.wrapper}>NavBar</div>;
};

export default NavBar;
