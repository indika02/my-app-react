import './App.css';
import Login from './component/login&register/login.js';
import Register from './component/login&register/register.js';
import Home from "./component/home/home";
import UserAcc from "./component/UserAccount/UserAcc";

import {BrowserRouter as Router, Routes,Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/UserAcc' element={<UserAcc Auth= {true} />}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
