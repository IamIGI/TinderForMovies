import { useMoviesContext } from '../../context/MoviesContext';
import c from './SideMenu.module.scss';

interface SideMenuProps {
  isVisible: boolean;
  onCloseCart: () => void;
}

const SideMenu: React.FC<SideMenuProps> = () => {
  const { likedMovies, dislikedMovies } = useMoviesContext();

  return (
    <div className={c.wrapper}>
      SideMenu
      <div className={c.content}>
        <h2>Liked Movies</h2>
        <ul>
          {likedMovies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
      <div className={c.content}>
        <h2>Disliked Movies</h2>
        <ul>
          {dislikedMovies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
