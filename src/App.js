import './App.css';
import AppNav from './components/AppNav';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <AppNav />
      <div className='appViews'>
        <AppRoutes />
      </div>

    </div>
  );
}

export default App;
