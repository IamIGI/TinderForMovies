import './styles/global.vars.scss';
import './styles/global.scss';
import MainTemplate from './views/MainTemplate/MainTemplate';
import Root from './views/Root';

function App() {
  return (
    <div className="app-wrapper">
      <MainTemplate>
        <Root />
      </MainTemplate>
    </div>
  );
}

export default App;
