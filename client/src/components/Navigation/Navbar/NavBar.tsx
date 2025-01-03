import c from './Navbar.module.scss';

interface NavBarProps {
  handleMenuClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ handleMenuClick }) => {
  return <div className={c.wrapper}>NavBar</div>;
};

export default NavBar;
