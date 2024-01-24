import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './Home'
import Login from './Login'
import Registration from './Registration'
import Post from './Post'
import OTP from './OTP'

function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/registration' element={<Registration/>}></Route>
          <Route path='/Post' element={<Post/>}></Route>
          <Route path='/OTP' element={<OTP/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  ); 
}
 
export default App;
