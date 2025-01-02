import './styles/global.vars.scss';
import './styles/global.scss';
import { tinderMovies } from './mocks/movies';

function App() {
  return (
    <>
      <h1>Home</h1>
      <img src={tinderMovies[1].imageUrl} alt="placeholder" />
    </>
  );
}

export default App;
