import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './Home'
import Login from './Login'
import Registration from './Registration'
import Post from './Post'
import OTP from './OTP'
import AccountCreated from './AccountCreated';
import Feed from './Feed';
import FullPostRead from './fullPostRead';
import CreatePost from './CreatePost'
 
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
          <Route path='/AccountCreated' element={<AccountCreated/>}></Route>
          <Route path='/Feed' element={<Feed/>}></Route>
          <Route path='/fullPostRead' element={<FullPostRead/>}></Route>
          <Route path='/CreatePost' element={<CreatePost/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  ); 
}
 
export default App;
