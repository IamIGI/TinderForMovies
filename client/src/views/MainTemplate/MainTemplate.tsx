import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

// import { useToggleState } from '../../hooks/useToggleState';

const MainTemplate: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const [isMenuVisible, toggleMenuVisibility, setMenuVisibility] =
  //   useToggleState(false);
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default MainTemplate;
