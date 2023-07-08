import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './pages/Home';
import Account from './pages/Account';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DashBoard from './pages/Dashboard';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/Home' element = {<Home/>}/>
          <Route path = '/Account' element = {<Account/>}/>
          <Route path = '/DashBoard' element = {<DashBoard/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;