import Cookies from "js-cookie";
import logo from './logo.svg';
import './App.css';

const isConnected = () => Cookies.get("app-session")

const redirectToLogin = () => {
  const url = `${window.ENV.AUTH_URL}/login?redirect_uri=${window.ENV.REDIRECT_URI}`;
  window.location.href = url;
}

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isConnected() ? <p>You are logged in</p> : <button onClick={redirectToLogin}>Login</button>}
      </header>
    </div>
  );
}

export default App;
