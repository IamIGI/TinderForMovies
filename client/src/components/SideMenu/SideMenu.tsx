import { useMoviesContext } from '../../context/MoviesContext';
import c from './SideMenu.module.scss';
import { motion } from 'framer-motion';

interface SideMenuProps {
  isVisible: boolean;
  onCloseCart: () => void;
}

const SideMenu: React.FC<SideMenuProps> = () => {
  const { likedMovies, dislikedMovies } = useMoviesContext();

  return (
    <div className={c.wrapper}>
      <div className={c.nav}>
        <div className={c.leftWrapper}>
          <img src="/svg/logo.svg" alt="logo" />
          <h2>
            <span>Tinder</span>
            <br />
            Movies
          </h2>
        </div>
        <div className={c.rightWrapper}>
          {/* Mock button */}
          <button>
            <img src="/svg/sideMenu/settings.svg" alt="settings" />{' '}
          </button>
          <img src="/images/profile.JPG" alt="profile" />
        </div>
      </div>
      <div className={c.contentWrapper}>
        <div className={c.content}>
          <h2>Liked</h2>
          <div className={c.movieList}>
            {likedMovies.map((movie) => (
              <motion.img
                key={movie.id}
                src={movie.imageUrl}
                alt={movie.title}
                initial={{ scale: 1.4, opacity: 0 }}
                animate={{ scale: 1.0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
        <div className={c.content}>
          <h2>Disliked</h2>
          <div className={c.movieList}>
            {dislikedMovies.map((movie) => (
              <motion.img
                key={movie.id}
                src={movie.imageUrl}
                alt={movie.title}
                initial={{ scale: 1.4, opacity: 0 }}
                animate={{ scale: 1.0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
