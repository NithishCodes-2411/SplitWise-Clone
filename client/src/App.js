// npm // import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Account from './pages/Account';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DashBoard from './pages/Dashboard';
import DisplayGroups from './components/Groups/DisplayGroups';
import DisplayGroupInfo from './components/Groups/DisplayGroupInfo';
import Expense from './pages/Expense';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Account' element={<Account />} />
          <Route path='/DashBoard' element={<DashBoard />} />
          <Route path='/DisplayGroup' element={<DisplayGroups />} />
          <Route path='/DisplayGroupInfo' element = {<DisplayGroupInfo/>}/>
          <Route path = '/Expense' element = {<Expense/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;