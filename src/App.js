import 'bootstrap/dist/css/bootstrap.min.css';
import UserLogin from './components/Userlogin';
import Usersignup from './components/User_signup';
import {Route, Routes } from 'react-router-dom';
import Chart from './components/Chart';


function App() {
  return (
    
      <Routes>
        <Route path="/User-signup" element={<Usersignup />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/" element={<Chart />} />


      </Routes>
  );
}

export default App;
