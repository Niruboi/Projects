
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/register';
import Protectedpage from './components/Protectedpage';
import { useSelector } from 'react-redux';
import Spinners from './components/Spinners';
import Profile from './pages/Profile';


function App() {
  const { loading } = useSelector ((state) => state.loaders);
  return (
    <div>
      { loading && <Spinners /> }
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Protectedpage> <Home /> </Protectedpage>} />
          <Route path='/profile' element={ <Protectedpage> <Profile /> </Protectedpage>} />
          <Route path='/register' element={ <Register />} />
          <Route path='/login' element={ <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
