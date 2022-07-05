import Header from './component/Header';
import User from './component/User';
import {Route,Routes} from 'react-router-dom'
import Createuser from './component/Createuser'
import Editeuser from './component/Edituser';
import Editeuseradmin from './component/Edituseradmin';
import Login from './component/Login';
import Register from './component/Register';
import Home from './component/Home';
import MoviesContainer from './component/movie';
import Createmovie from './component/Createmovie';
import Editmovie from './component/Editmovie';
import Homemovie from './component/Homemovie';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home/:id' element={<Homemovie/>}/>
        <Route path='/movies' element={<MoviesContainer />}/>
        <Route path='/editmovie/:id' element={<Editmovie />}/>
        <Route path='/createmovie' element={<Createmovie />}/>
        <Route path='/users' element={<User />}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/createuser' element={<Createuser/>} />
        <Route path='/edituser/:id' element={<Editeuser/>} />
        <Route path='/edituseradmin/:id' element={<Editeuseradmin/>} />
      </Routes>
    </div>
  );
}

export default App;
