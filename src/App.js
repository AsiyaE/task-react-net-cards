import CardGrid from './components/CardGrid/index';
import './index.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <span>Header</span>
      </header>
      <div className="left-side">
        <span>Left side</span>
      </div>
      <div className="content">
        <CardGrid/>
      </div>
      <div className="right-side">
        <span>Right side</span>
      </div>
      <footer className="footer">
        <span>Footer</span>
      </footer>
    </div>
  );
}

export default App;
