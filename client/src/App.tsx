import './styles/global.vars.scss';
import './styles/global.scss';
import MainTemplate from './views/MainTemplate/MainTemplate';
import Root from './views/Root';
import { MovieContextProvider } from './context/MoviesContext';

function App() {
  return (
    <MovieContextProvider>
      <div className="app-wrapper">
        <MainTemplate>
          <Root />
        </MainTemplate>
      </div>
    </MovieContextProvider>
  );
}

export default App;
