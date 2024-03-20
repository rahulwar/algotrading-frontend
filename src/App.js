import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from './components/Userlogin';
import UserSignup from './components/User_signup';
import Chart from './components/Chart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/User-signup" element={<UserSignup />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/" element={<Chart />} />
      </Routes>
    </Router>
  );
}

export default App;
