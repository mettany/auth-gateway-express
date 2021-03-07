import { useEffect, useState } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

const redirectToLogin = () => {
  const url = `${window.ENV.AUTH_URL}/login?redirect_uri=${window.ENV.REDIRECT_URI}`;
  window.location.href = url;
}

const getUserInfo = async (cb) => {
  try {
    const response = await axios.get(`${window.ENV.AUTH_URL}/userinfos`, { withCredentials: true });
    cb(response.data);
  } catch(error) {
    cb(null);
  }
}

const callApi = async () => {
  try {
    const response = await axios.get(`${window.ENV.API_BASE_PATH}/authorized`, { withCredentials: true });
    console.log(response);
  } catch(error) {
    console.log(error);
  }
}

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserInfo(setUser);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {user ? <button onClick={callApi}>Call API</button> : <button onClick={redirectToLogin}>Login</button>}
      </header>
    </div>
  );
}

export default App;
