import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useMoviesContext } from '../../context/MoviesContext';
import MoviePreview from './MoviePreview/MoviePreview';
import c from './Menu.module.scss';
import UserMovies from './UserMovies/UserMovies';
import { Movie } from '../../interfaces/movie.interface.';
import Navigation from './Navigation/Navigation';

enum ScrollDirection {
  Left = 'left',
  Right = 'right',
}

interface MenuProps {
  isMenuVisible: boolean;
  setMenuVisibility: Dispatch<SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({ setMenuVisibility, isMenuVisible }) => {
  const { userMovies } = useMoviesContext();
  const [hasMenuBeenHidden, setHasMenuBeenHidden] = useState(false);
  const [moviePreview, setMoviePreview] = useState<Movie | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      console.log('triggered');
      if (window.innerWidth <= 920 && !hasMenuBeenHidden) {
        resetToMovieLists();
        setHasMenuBeenHidden(true); // Mark as hidden
        setMenuVisibility(false);
      }

      if (!isMenuVisible && window.innerWidth > 920) {
        resetToMovieLists();
        setHasMenuBeenHidden(false);
        setMenuVisibility(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [hasMenuBeenHidden]);

  useEffect(() => {
    if (moviePreview) {
      scrollHorizontal(ScrollDirection.Right);
    }
  }, [moviePreview]);

  const resetToMovieLists = () => {
    if (contentRef.current) {
      contentRef.current.scrollLeft = 0;
    }
  };

  const scrollHorizontal = (direction: ScrollDirection) => {
    if (contentRef.current) {
      const { scrollLeft, clientWidth } = contentRef.current;
      const directionValue = direction === ScrollDirection.Right ? 1 : -1;

      contentRef.current.scrollTo({
        left: scrollLeft + clientWidth * directionValue,
      });
    }
  };

  const handleSelectMoviePreview = (selectedMovie: Movie) => {
    setMoviePreview(selectedMovie);
    scrollHorizontal(ScrollDirection.Right);
  };

  const closeMenu = () => {
    resetToMovieLists();
    setMenuVisibility(false);
  };

  return (
    <div
      className={c.wrapper}
      style={{ display: isMenuVisible ? 'flex' : 'none' }}
    >
      <Navigation toggleMenuVisibility={closeMenu} />
      <div className={c.contentWrapper} ref={contentRef}>
        <UserMovies
          likedMovies={userMovies.data.liked}
          dislikedMovies={userMovies.data.disliked}
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

export default Menu;
