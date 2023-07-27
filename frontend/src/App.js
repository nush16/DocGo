import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import AppointmentPage from './components/AppointmentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><TopBar currentPage="signin"/><HomePage /></>} />
        <Route path="/signup" element={<><TopBar currentPage="signup"/><SignUpPage /></>} />
        <Route path="/forgotpassword" element={<><TopBar currentPage="signup"/><ForgotPasswordPage /></>} />
        <Route path="/appointments" element={<><TopBar currentPage="signup"/><AppointmentPage /></>} />
        <Route path="/appointments" element={<><TopBar currentPage="signup"/><AppointmentPage /></>} />
      </Routes>
    </Router>
  );
}

export default App;
