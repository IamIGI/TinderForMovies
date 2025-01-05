import { useEffect, useRef, useState } from 'react';
import { useMoviesContext } from '../../context/MoviesContext';
import MoviePreview from './MoviePreview/MoviePreview';
import c from './SideMenu.module.scss';
import UserMovies from './UserMovies/UserMovies';
import { Movie } from '../../interfaces/movie.interface.';

enum ScrollDirection {
  Left = 'left',
  Right = 'right',
}
interface SideMenuProps {
  isVisible: boolean;
  onCloseCart: () => void;
}

const SideMenu: React.FC<SideMenuProps> = () => {
  const { likedMovies, dislikedMovies } = useMoviesContext();
  const [moviePreview, setMoviePreview] = useState<Movie | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollHorizontal = (direction: ScrollDirection) => {
    if (contentRef.current) {
      const { scrollLeft, clientWidth } = contentRef.current;
      const directionValue = direction === ScrollDirection.Right ? 1 : -1;

      contentRef.current.scrollTo({
        left: scrollLeft + clientWidth * directionValue,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectMoviePreview = (selectedMovie: Movie) => {
    setMoviePreview(selectedMovie);
    scrollHorizontal(ScrollDirection.Right);
  };

  useEffect(() => {
    if (moviePreview) {
      scrollHorizontal(ScrollDirection.Right);
    }
  }, [moviePreview]);

  return (
    <div className={c.wrapper}>
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
              src="/svg/sideMenu/settings.svg"
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
      <div className={c.contentWrapper} ref={contentRef}>
        <UserMovies
          likedMovies={likedMovies}
          dislikedMovies={dislikedMovies}
          handleSelectedMovie={handleSelectMoviePreview}
        />
        <MoviePreview
          movie={moviePreview}
          handleGoBack={() => scrollHorizontal(ScrollDirection.Left)}
        />
      </div>
    </div>
  );
};

export default SideMenu;
