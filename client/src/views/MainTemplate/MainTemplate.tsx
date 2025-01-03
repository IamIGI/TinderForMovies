import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../../components/Navigation/Navbar/NavBar';

// import SideMenu from '../../components/SideMenu/SideMenu';
// import { useToggleState } from '../../hooks/useToggleState';

const MainTemplate: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const [isMenuVisible, toggleMenuVisibility, setMenuVisibility] =
  //   useToggleState(false);
  return (
    <BrowserRouter>
      <NavBar handleMenuClick={() => {}} />
      {children}

      {/* <SideMenu
        isVisible={isMenuVisible}
        onCloseCart={() => setMenuVisibility(false)}
      /> */}
      {/* <CartPreview
        isVisible={isCartVisible}
        onCloseCart={() => setCartVisibility(false)}
      /> */}
    </BrowserRouter>
  );
};

export default MainTemplate;
