import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './pages/Home';
import Account from './pages/Account';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/Home' element = {<Home/>}/>
          <Route path = '/Account' element = {<Account/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
