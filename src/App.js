import {Routes,Route}  from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './Components/Shared/Navbar';
import Home from './Pages/Home';
import Login from './Pages/login';
import Register from './Pages/register';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
