import { useState } from 'react';
import './App.css';
import AppNav from './components/AppNav';
import AppRoutes from './routes/AppRoutes';
import axios from 'axios';
import Cookies from 'js-cookie';

function App() {
  
  const [user, setUser] = useState(JSON.parse(Cookies.get('user') || 'null'))
  axios.defaults.headers.common['Authorization'] =  (user? user.jwt : "")
  return (
    <div className="App">
      <AppNav user={user} setUser={setUser}/>
      <div className='appViews'>
        <AppRoutes user={user} setUser={setUser}/>
      </div>

    </div>
  );
}

export default App;


