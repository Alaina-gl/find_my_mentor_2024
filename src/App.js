// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Find My Mentor</h1>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p> Find a mentor for yourself today!</p>
        <a
          className="App-link"
          href="https://www.youtube.com/watch?v=b9eMGE7QtTk&list=PLYHf1Np6LKoKtY21uqd4ctg4iofiWjA9E&index=6" //edited hyperlink here
          target="_blank"
          rel="noopener noreferrer"
        >
          Click on Hyperlink Here!
        </a>
      </header>
    </div>
  );
}

export default App;
